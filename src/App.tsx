import React, { useState, useEffect } from "react";
import Select from "react-select";
import _ from "lodash";

const mapResponseToValuesAndLabels = (data) => ({
  value: data.node_id,
  label: data.login
});

async function callApi(value: string) {
  const data = await fetch(`https://api.github.com/search/users?q=${value}`)
    .then((response) => response.json())
    .then((response) => response.items.map(mapResponseToValuesAndLabels))
    .catch((response) => console.log(response));
  return data;
}
async function debouncecallapi(value: string, setapi) {
  console.log(value);
  return await _.debounce(async function () {
    return setapi(await callApi(value));
  }, 1000)();
}

export default function PageComponent() {
  const [getvalue, setValue] = useState();
  const [getapi, setapi] = useState();
  console.log(typeof getapi);
  console.log(getapi);
  useEffect(() => {
    (async () => {
      //ここに処理を書く
      return await debouncecallapi(getvalue, setapi);
    })();
  }, [getvalue]);
  return (
    <div>
      <p>Exemplo de Async Select com api</p>
      <Select
        className="input-cont"
        onInputChange={(data) => {
          // console.log(data);
          setValue(data);
        }}
        placeholder="Select an individual"
        options={getapi}
      />
    </div>
  );
}
