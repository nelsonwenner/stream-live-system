import React from 'react';
import './styles.css';

const DeviceSelect = ({classs, name, value, label ,devices, handlerSelect }) => {
  return (
    <div className={`wrapper-select ${classs}`}>
      <label className="label">{ label }</label>
      <select
        className="select"
        defaultValue=""
        name={ name }
        value={ value }
        onChange={ handlerSelect }
      > 
        <option value="" disabled="disabled" >Select { `${ label }` }</option>
        
        {devices
          ? 
          devices.map((device, index) => (
            <option value={ device.deviceId } key={ index }>
              { device.label }
            </option>
          ))
          :
          <option value={ label }>
            { label }
          </option>
        }
      </select>
    </div>
  )
}

export default DeviceSelect;