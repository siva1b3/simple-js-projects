import React, { useState } from "react";
import "./App.css";
import BarChart from "./Layout/AllCharts";
import App01 from "./ExtraBarchart/NewBar";
import RandomiseValue from "./Data/Random";

export default function App() {
  const [stateOfFiltersJson, setStateOfFiltersJson] = useState({
    Homes: "All placements",
    Age: ["0-3", "4-6", "7-12", "13-15", "16-above"],
    Region: "Both",
  });

  function ChangeJSONBasedOnNewValues(Key, Value) {
    if (Key === "Homes") {
      setStateOfFiltersJson((prevState) => {
        return { ...prevState, Homes: Value };
      });
    } else if (Key === "Age") {
      setStateOfFiltersJson((prevState) => {
        return { ...prevState, Age: Value };
      });
    } else if (Key === "Region") {
      setStateOfFiltersJson((prevState) => {
        return { ...prevState, Region: Value };
      });
    }
  }

  // {
  //   "Homes": "Home Needs",
  //   "Age": "0-3",
  //   "Region": "West",
  //   "Gender": "Male",
  //   "Race": "American Indian/Alsakan",
  //   "PlacementType": "Foster",
  //   "Value": "1",
  //    "id":78
  // }

  // Age: ["", "0-3", "13-15", "16-above", "4-6", "7-12"],
  // Gender: ["", "FeMale", "Male", "Others", "TG F To M", "TG M To F"],
  // Homes: ["All placements", "", "Home Needs"],
  // PlacementType: ["APA", "", "Foster", "KinShip", "Resedential", "Unknown"],
  // Race: [
  //   "American Indian/Alsakan",
  //   "Asian",
  //   "Black",
  //   "Black/ African American",
  //   "",
  //   "Hispanic",
  //   "Multi Racial",
  //   "Native American",
  //   "Other/NA",
  //   "White",
  //   "White/Hispanic",
  // ],
  // Region: ["", "West", "Wichita"],

  let filteredjson = RandomiseValue();
  let isEmptyArray = false;

  function HomesFilter(Json) {
    return Json.filter((item) => {
      return item["Homes"] === stateOfFiltersJson["Homes"];
    });
  }
  filteredjson = HomesFilter(filteredjson);

  function Agefilter(Json) {
    return Json.filter((item) => {
      return stateOfFiltersJson["Age"].includes(item["Age"]);
    });
  }

  filteredjson = Agefilter(filteredjson);

  function CheckForEmptyArray(Json) {
    return Json.length === 0;
  }

  isEmptyArray = CheckForEmptyArray(filteredjson);

  function RegionFilter(Json) {
    if (isEmptyArray) {
      console.log("empty array recived for RegionFilter");
      return null;
    }
    if (stateOfFiltersJson["Region"] === "Both") {
      return Json;
    }
    return Json.filter((item) => {
      return item["Region"] === stateOfFiltersJson["Region"];
    });
  }

  filteredjson = RegionFilter(filteredjson);

  // const sumOfValues = filteredjson.reduce((accumulator, currentValue) => {
  //   return accumulator + parseInt(currentValue.Value);
  // }, 0);
  // console.log(sumOfValues);

  // const k = filteredjson.slice(0, 5);

  return (
    <div>
      <BarChart
        stateOfFiltersJson={stateOfFiltersJson}
        changesInJson={ChangeJSONBasedOnNewValues}
        filteredjson={filteredjson}
      />
      {/* {sumOfValues}
      {k.map((item, index) => {
        return <p key={index}>{JSON.stringify(item)}</p>;
      })} */}
    </div>
  );
}
