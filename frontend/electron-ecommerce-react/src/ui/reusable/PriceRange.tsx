import {Range} from "react-range";
import {useEffect, useState} from "react";
import {useFetchProducts} from "../../custom_hooks/useFetchProducts.ts";

type RangeSliderProps = {
    minRange: number,
    maxRange: number,
    callback: (newValues: number[]) => void;
}

export const PriceRange = ({minRange, maxRange, callback}: RangeSliderProps) => {

    const [values, setValues] = useState([minRange, maxRange]);
    const fetchProducts = useFetchProducts();

    const handleChange = (newValues: number[]) => {
        callback(newValues);
        setValues(newValues);
    }

    const handleFinalChange = () => {
        fetchProducts();
    }

    const setInnerWidth = () => {
        return ((values[1] - values[0]) / (maxRange - minRange)) * 100
    }

    useEffect(() => {
        setValues([minRange, maxRange])
    }, [maxRange])

    return (
        <div className={"w-5/6 sm:w-5/6 mx-3"}>
            <Range
                step={1}
                min={minRange}
                max={maxRange}
                values={values}
                onChange={handleChange}
                onFinalChange={handleFinalChange}
                renderTrack={({props, children}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: '#ccc',
                        }}
                    >
                        {children}
                        <div
                            style={{
                                position: 'absolute',
                                height: '6px',
                                width: `${setInnerWidth()}%`,
                                backgroundColor: '#0e1120',
                                left: `${((values[0] - minRange) / (maxRange - minRange)) * 100}%`,
                            }}
                        />
                    </div>
                )}
                renderThumb={({props}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '24px',
                            zIndex: 999,
                            width: '24px',
                            backgroundColor: '#ffffff',
                            borderRadius: '50%',
                            border: '2px solid #0e1120',
                            cursor: 'inherit',
                        }}
                    />
                )}
            />
            <div className={"flex gap-5 justify-center mt-3"}>
                <div>
                    £{values[0]}
                </div>
                <div>
                    £{values[1]}
                </div>
            </div>
        </div>
    )
}
