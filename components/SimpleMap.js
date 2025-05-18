// src/components/Map.js
import React from 'react';
import { View, Text, Platform } from 'react-native';

export default function SimpleMap({ latitude, longitude, title }) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <View style={{ height: 200, marginVertical: 15 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{title || 'Ubicación'}</Text>

      {/* Usamos iframe en todas las plataformas */}
      <View style={{ flex: 1 }}>
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, borderRadius: 10 }}
          allowFullScreen
        />
      </View>
    </View>
  );
}
