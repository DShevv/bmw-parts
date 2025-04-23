"use client";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./Map.module.scss";
import Marker from "@/components/Marker/Marker";

declare global {
  interface Window {
    ymaps3: typeof import("@yandex/ymaps3-types");
  }
}

function Map({ className }: { className?: string }) {
  const mapRef = useRef(null);

  useEffect(() => {
    async function initMap() {
      if (mapRef.current) {
        await ymaps3.ready;

        const {
          YMap,
          YMapDefaultSchemeLayer,
          YMapDefaultFeaturesLayer,
          YMapMarker,
        } = ymaps3;

        const map = new YMap(
          mapRef.current,
          {
            location: { center: [27.631837, 53.959675], zoom: 16 },
            mode: "vector",
          },
          [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
        );

        map.addChild(
          new YMapMarker(
            {
              coordinates: [27.631837, 53.959675],
              draggable: false,
              mapFollowsOnDrag: true,
            },
            Marker()
          )
        );
      }
    }

    initMap();
  }, [mapRef]);

  return (
    <>
      <section ref={mapRef} className={clsx(styles.container, className)} />
    </>
  );
}

export default Map;
