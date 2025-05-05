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
    initialValue ? Number(initialValue[0]) : minPrice
  );
  const [maxValue, setMaxValue] = useState<number>(
    initialValue ? Number(initialValue[1]) : maxPrice
  );
  const [debouncedValue, setDebouncedValue] = useState<
    [number, number] | undefined
  >(undefined);

  useEffect(() => {
    setMinValue(initialValue ? Number(initialValue[0]) : minPrice);
    setMaxValue(initialValue ? Number(initialValue[1]) : maxPrice);
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (minValue !== minPrice || maxValue !== maxPrice)
        setDebouncedValue([minValue, maxValue]);

      if (minValue === minPrice && maxValue === maxPrice) {
        setDebouncedValue([minPrice, maxPrice]);
      }
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [minValue, maxValue]);

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
      maxPrice,
      Math.max(Number(e.target.value), minValue)
    );
    setMaxValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <label className="t-placeholder">
          от <input type="number" value={minValue} onChange={handleMinChange} />
        </label>
        <label className="t-placeholder">
          до <input type="number" value={maxValue} onChange={handleMaxChange} />
        </label>
      </div>
      <div className={styles.sliderContainer}>
        <RangeSlider
          min={minPrice}
          max={maxPrice}
          value={[minValue, maxValue]}
          onInput={(value) => {
            setMinValue(value[0]);
            setMaxValue(value[1]);
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
