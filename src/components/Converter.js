import { Card, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './Converter.css'

function Converter() {

  const apiURL = "https://api.coingecko.com/api/v3/exchange_rates";
  const firstSelectDefault = "Bitcoin";
  const secondSelectDefault = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(firstSelectDefault);
  const [secondSelect, setSecondSelect] = useState(secondSelectDefault);
  const [result, setResult] = useState("0");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

    if (cryptoList.length === 0) return;

    const firstRate = cryptoList.find((item) => {
      return item.value === firstSelect;
    }).rate;

    const secondRate = cryptoList.find((item) => {
      return item.value === secondSelect;
    }).rate;

    const tempResult = (inputValue * secondRate) / firstRate;
    setResult(tempResult.toFixed(2));

  }, [inputValue, firstSelect, secondSelect, cryptoList]);

  async function fetchData() {
    const res = await fetch(apiURL);
    const jsonData = await res.json();
    const data = Object.entries(jsonData.rates);

    const tempArray = data.map(item => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value
      }
    })

    setCryptoList(tempArray);
  }

  return (
    <div className="container">
      <Card title={<h1 style={{ color: '#007acc' }}>Crypto Converter</h1>} className="crypto-card">
        <Form>
          <Form.Item>
            <Input onChange={(event) => setInputValue(event.target.value)} />
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select onChange={(value) => setFirstSelect(value)} style={{ width: "12.5rem" }} defaultValue={firstSelectDefault} options={cryptoList} />
          <Select onChange={(value) => setSecondSelect(value)} style={{ width: "12.5rem" }} defaultValue={secondSelectDefault} options={cryptoList} />
        </div>
        <p>{inputValue} {firstSelect} = {result} {secondSelect}</p>
      </Card>
    </div>
  );
}

export default Converter;