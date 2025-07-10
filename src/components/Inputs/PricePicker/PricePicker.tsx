"use client";
import React, { useEffect, useState } from "react";
import styles from "./PricePicker.module.scss";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface PricePickerProps {
  initialValue?: number[];
  minPrice: number;
  maxPrice: number;
  onChange: (value: [number, number]) => void;
}

const PricePicker = ({
  initialValue,
  minPrice,
  maxPrice,
  onChange,
}: PricePickerProps) => {
  const [minValue, setMinValue] = useState<number>(
    initialValue ? Number(initialValue[0]) : Number(minPrice)
  );
  const [maxValue, setMaxValue] = useState<number>(
    initialValue ? Number(initialValue[1]) : Number(maxPrice)
  );
  const [debouncedValue, setDebouncedValue] = useState<
    [number, number] | undefined
  >(undefined);

  useEffect(() => {
    setMinValue(initialValue ? Number(initialValue[0]) : Number(minPrice));
    setMaxValue(initialValue ? Number(initialValue[1]) : Number(maxPrice));
  }, [initialValue, minPrice, maxPrice]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const minChanged = Math.abs(minValue - minPrice) > 0.01;
      const maxChanged = Math.abs(maxValue - Number(maxPrice)) > 0.01;

      if (minChanged || maxChanged) {
        setDebouncedValue([minValue, maxValue]);
      } else {
        setDebouncedValue([minPrice, Number(maxPrice)]);
      }
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [minValue, maxValue, minPrice, maxPrice]);

  useEffect(() => {
    if (debouncedValue) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      Number(minPrice),
      Math.min(Number(e.target.value), maxValue)
    );
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Number(maxPrice),
      Math.max(Number(e.target.value), minValue)
    );
    setMaxValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <label className="t-placeholder">
          от{" "}
          <input
            type="number"
            step="0.01"
            value={Math.round(minValue * 100) / 100}
            onChange={handleMinChange}
          />
        </label>
        <label className="t-placeholder">
          до{" "}
          <input
            type="number"
            step="0.01"
            value={Math.round(maxValue * 100) / 100}
            onChange={handleMaxChange}
          />
        </label>
      </div>
      <div className={styles.sliderContainer}>
        <RangeSlider
          min={minPrice}
          max={Number(maxPrice)}
          step={0.01}
          value={[minValue, maxValue]}
          onInput={(value) => {
            setMinValue(Math.round(value[0] * 100) / 100);
            setMaxValue(Math.round(value[1] * 100) / 100);
          }}
          className={styles.slider}
          id="pricePicker"
          rangeSlideDisabled={true}
        />
      </div>
    </div>
  );
};

export default PricePicker;
