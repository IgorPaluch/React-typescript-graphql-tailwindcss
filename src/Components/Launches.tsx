import React from "react";
import { gql, useQuery } from "@apollo/client";
import "../Components/Launches.css";
import Card from "../Components/Card";

type Rocket = {
  __typename: string;
  rocket_name: string;
  rocket_type: string;
};

type Ship = {
  image: string;
};

export type Launch = {
  __typename: string;
  mission_name: string;
  rocket: Rocket;
  ships: Ship;
};

type ILaunches = Array<Launch>;

type LaunchData = {
  loading: boolean;
  data: {
    launches?: [ILaunches];
  };
};

const renderLaunches = (launches: ILaunches, ships) => {
  return launches.map((data) => <Card cardData={data} />);
};

const Launches = () => {
  const GET_LAUNCHES = gql`
    query getLaunches($offset: Int, $limit: Int) {
      launches(offset: $offset, limit: $limit) {
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
      }
      ships(offset: $offset, limit: $limit) {
        image
      }
    }
  `;

  const { error, loading, data } = useQuery(GET_LAUNCHES, {
    variables: { offset: 10, limit: 30 },
  });
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const { launches, ships } = data;
  console.log(ships);
  return (
    <div className="grid grid-cols grid-cols-2 grid-rows-1 gap-x-2.5 max-w-5xl pt-96">
      {renderLaunches(launches, ships)}
    </div>
  );
};

export default Launches;
