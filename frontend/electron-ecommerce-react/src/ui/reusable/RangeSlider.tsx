import {Range} from "react-range";
import {useEffect, useState} from "react";

type RangeSliderProps = {
    minRange: number,
    maxRange: number,
    callback: (newValues: number[]) => void;

}

export const RangeSlider = ({minRange, maxRange, callback}: RangeSliderProps) => {

    const [values, setValues] = useState([minRange, maxRange]);

    const handleChange = (newValues: number[]) => {
        callback(newValues);
        setValues(newValues);
    }

    const setInnerWidth = () => {
        return ((values[1] - values[0]) / (maxRange - minRange)) * 100
    }

    useEffect(() => {
        setValues([minRange, maxRange])
    }, [maxRange])

    return (
        <>
            <Range
                step={1}
                min={minRange}
                max={maxRange}
                values={values}
                onChange={handleChange}
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
            <div className={"flex gap-5 justify-center"}>
                <div>
                    £{values[0]}
                </div>
                <div>
                    £{values[1]}
                </div>
            </div>
        </>
    )
}
