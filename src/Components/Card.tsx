import { Launch } from "./Launches";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import * as React from "react";

const Card = ({ cardData }: { cardData: Launch }) => {
  const images = [image1, image2, image3, image4];
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const randomPicture = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  const showModalFunction = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  console.log(cardData);
  const {
    mission_name,
    rocket: { rocket_name, rocket_type },
  } = cardData;
  return (
    <>
      <div key={mission_name} className="pb-10" onClick={showModalFunction}>
        <div>
          <h3 className="text-center pb-8 text-lg font-semibold">
            {mission_name}
          </h3>
          <p className="text-center">
            {rocket_name}
            <br></br>
            {rocket_type}
          </p>
          <img src={randomPicture()} alt={mission_name} />
        </div>
      </div>
      {showModal ? (
        <div className="absolute w-2/3 h-2/3 rounded-md bg-black text-white left-0 right-0 top-0 bottom-0 m-auto">
          <div
            className="text-white cursor-pointer"
            onClick={() => setShowModal(!showModal)}
          >
            X
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Card;
