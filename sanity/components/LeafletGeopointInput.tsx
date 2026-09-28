import React, { useEffect, useRef, useState, useCallback } from 'react';
import { set, unset, type ObjectInputProps } from 'sanity';
import L from 'leaflet';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import 'leaflet/dist/leaflet.css';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface GeopointValue {
  _type?: 'geopoint';
  lat?: number;
  lng?: number;
  alt?: number;
}

const DEFAULT_CENTER: [number, number] = [13.692, -89.245]; // Área Metropolitana de San Salvador
const DEFAULT_ZOOM = 13;

// Marcador personalizado con icono SVG para evitar problemas de rutas de Leaflet en Vite
const customMarkerIcon = L.divIcon({
  className: 'sanity-leaflet-marker',
  html: `
    <div style="position: relative; transform: translate(-50%, -100%); cursor: grab;">
      <div style="width: 36px; height: 36px; border-radius: 50%; background: #6E1F1C; border: 2.5px solid #FFFFFF; box-shadow: 0 4px 14px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: white;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; fill: white;" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 8px; height: 8px; background: #6E1F1C;"></div>
    </div>
  `,
  iconSize: [36, 40],
  iconAnchor: [18, 40],
});

export function LeafletGeopointInput(props: ObjectInputProps<GeopointValue>) {
  const { value, onChange } = props;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerInstanceRef = useRef<L.Marker | null>(null);

  const [latInput, setLatInput] = useState<string>(value?.lat !== undefined ? String(value.lat) : '');
  const [lngInput, setLngInput] = useState<string>(value?.lng !== undefined ? String(value.lng) : '');

  // Sincronizar inputs locales si el valor externo cambia
  useEffect(() => {
    setLatInput(value?.lat !== undefined ? String(value.lat) : '');
    setLngInput(value?.lng !== undefined ? String(value.lng) : '');
  }, [value?.lat, value?.lng]);

  // Inyectar hojas de estilo de Leaflet y MapLibre GL en Sanity Studio si no existen
  useEffect(() => {
    const leafletCssId = 'sanity-leaflet-styles';
    if (!document.getElementById(leafletCssId)) {
      const link = document.createElement('link');
      link.id = leafletCssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const maplibreCssId = 'sanity-maplibre-styles';
    if (!document.getElementById(maplibreCssId)) {
      const link = document.createElement('link');
      link.id = maplibreCssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';
      document.head.appendChild(link);
    }
  }, []);

  // Actualizar Sanity y estado local
  const updateCoords = useCallback(
    (lat: number, lng: number) => {
      const cleanLat = Number(lat.toFixed(6));
      const cleanLng = Number(lng.toFixed(6));
      setLatInput(String(cleanLat));
      setLngInput(String(cleanLng));

      onChange(
        set({
          _type: 'geopoint',
          lat: cleanLat,
          lng: cleanLng,
        })
      );
    },
    [onChange]
  );

  // Inicialización del mapa Leaflet
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = value?.lat ?? DEFAULT_CENTER[0];
      const initialLng = value?.lng ?? DEFAULT_CENTER[1];
      const hasInitialCoords = value?.lat !== undefined && value?.lng !== undefined;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: hasInitialCoords ? 15 : DEFAULT_ZOOM,
        scrollWheelZoom: false,
        maxBounds: [[180, -Infinity], [-180, Infinity]],
        maxBoundsViscosity: 1,
        minZoom: 1,
      });

      maplibreGL({
        style: 'https://tiles.openfreemap.org/styles/liberty',
      }).addTo(map);

      if (map.attributionControl) {
        map.attributionControl.addAttribution(
          '<a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        );
      }

      // Si ya existen coordenadas, colocar marcador arrastrable
      if (hasInitialCoords) {
        const marker = L.marker([initialLat, initialLng], {
          icon: customMarkerIcon,
          draggable: true,
        }).addTo(map);

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          updateCoords(pos.lat, pos.lng);
        });

        markerInstanceRef.current = marker;
      }

      // Clic en el mapa para posicionar o mover el marcador
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (markerInstanceRef.current) {
          markerInstanceRef.current.setLatLng([lat, lng]);
        } else {
          const marker = L.marker([lat, lng], {
            icon: customMarkerIcon,
            draggable: true,
          }).addTo(map);

          marker.on('dragend', () => {
            const pos = marker.getLatLng();
            updateCoords(pos.lat, pos.lng);
          });

          markerInstanceRef.current = marker;
        }
        updateCoords(lat, lng);
      });

      mapInstanceRef.current = map;

      // Asegurar redimensionamiento correcto dentro de modales o tabs de Sanity
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      // Cleanup al desmontar
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerInstanceRef.current = null;
      }
    };
  }, [updateCoords]);

  // Manejador para aplicar edición manual de inputs
  const handleApplyManualCoords = () => {
    const parsedLat = parseFloat(latInput);
    const parsedLng = parseFloat(lngInput);

    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
      updateCoords(parsedLat, parsedLng);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([parsedLat, parsedLng], 15);
        if (markerInstanceRef.current) {
          markerInstanceRef.current.setLatLng([parsedLat, parsedLng]);
        } else {
          const marker = L.marker([parsedLat, parsedLng], {
            icon: customMarkerIcon,
            draggable: true,
          }).addTo(mapInstanceRef.current);

          marker.on('dragend', () => {
            const pos = marker.getLatLng();
            updateCoords(pos.lat, pos.lng);
          });

          markerInstanceRef.current = marker;
        }
      }
    }
  };

  // Manejador para limpiar ubicación
  const handleClearLocation = () => {
    if (markerInstanceRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(markerInstanceRef.current);
      markerInstanceRef.current = null;
    }
    setLatInput('');
    setLngInput('');
    onChange(unset());
  };

  const hasCoords = value?.lat !== undefined && value?.lng !== undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Contenedor del Mapa Leaflet */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '320px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #dcdad5',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
          zIndex: 0,
        }}
      />

      {/* Controles de lectura y edición manual */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto auto',
          gap: '8px',
          alignItems: 'center',
          backgroundColor: '#faf8f5',
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #eee8df',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#555', marginBottom: '2px' }}>
            Latitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={latInput}
            onChange={(e) => setLatInput(e.target.value)}
            placeholder="13.704250"
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '13px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#555', marginBottom: '2px' }}>
            Longitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={lngInput}
            onChange={(e) => setLngInput(e.target.value)}
            placeholder="-89.243520"
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '13px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleApplyManualCoords}
          style={{
            alignSelf: 'flex-end',
            padding: '7px 12px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#6E1F1C',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          title="Actualizar marcador en el mapa"
        >
          Aplicar
        </button>

        {hasCoords && (
          <button
            type="button"
            onClick={handleClearLocation}
            style={{
              alignSelf: 'flex-end',
              padding: '7px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#c53030',
              backgroundColor: '#fff',
              border: '1px solid #feb2b2',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            title="Eliminar coordenadas guardadas"
          >
            Limpiar
          </button>
        )}
      </div>

      <p style={{ margin: 0, fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
        💡 <strong>Instrucciones:</strong> Haz clic en cualquier punto del mapa para colocar el marcador, o arrástralo para afinar la ubicación. También puedes ingresar valores manuales y pulsar "Aplicar". Se guardará como un <code>geopoint</code> estándar.
      </p>
    </div>
  );
}
