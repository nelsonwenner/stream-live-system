import React from 'react';
import './device-select.css';

const DeviceSelect = ({value, label ,devices, onChange}) => {
  return (
    <div className="container-select">
      <div className="position-label">
        <label className={'label'}>{label}</label>
      </div>
      <select className={'select mt-17'} onChange={(event) => onChange(event.target.value) } value={ value }>
        {
          devices 
            ? devices.map((device, key) => (
              <option value={ device.deviceId } key={ key }>
                { device.label }
              </option>
            ))

            : (
                <>
                  <option defaultValue={'Not selected'} value={ 'Not selected' }>
                    { 'Not selected' }
                  </option>
                  <option value={ value }>
                    { label }
                  </option>
                </>
              )
        }
      </select>
    </div>
  )
}

export default DeviceSelect;