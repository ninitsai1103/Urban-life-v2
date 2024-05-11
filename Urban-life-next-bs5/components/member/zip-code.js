import { useEffect, useState } from 'react';
import regions from '@/data/regions.json'; 

const ZipCode = ({ onAddressChange }) => {
  const [county, setCounty] = useState('');
  const [township, setTownship] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (county && township && address) {
      const fullAddress = `${county}${township}${address}`;
      onAddressChange(fullAddress); // 在這裡調用回調函式，將完整地址傳遞給父組件
    }
  }, [county, township, address]); 

  return (
    <>
         <div className="row">
      <div className="col-lg-4 col-md-6 mb-3">
        <select value={county} onChange={(e) => setCounty(e.target.value)} className="form-select">
          <option value="">選擇縣市</option>
          {Object.keys(regions).map((countyName, index) => (
            <option key={index} value={countyName}>{countyName}</option>
          ))}
        </select>
      </div>
      <div className="col-lg-4 col-md-6 mb-3">
        <select value={township} onChange={(e) => setTownship(e.target.value)} className="form-select">
          <option value="">選擇地區</option>
          {county && regions[county].map((townshipName, index) => (
            <option key={index} value={townshipName}>{townshipName}</option>
          ))}
        </select>
      </div>
      <div className="col-lg-4 col-md-12 mb-3">
        <input
          type="text"
          placeholder="請輸入地址"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control"
        />
      </div>
    </div>
    </>
  );
};

export default ZipCode;
