import styled from "styled-components";
import { useState, useEffect } from "react";
import Select from "../../Form/Select";
import axios from "axios";

const Cont = styled.div`
  h6 {
    word-wrap: break-word;
  }
`;
const Delivery = ({
  updateForm,
  formData,
  pickup,
  setPickupTrue,
  setPickupFalse,
  setRegion,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [statesDup, setStatesDup] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesDup, setCitiesDup] = useState([]);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [regions, setRegions] = useState([]);
  useEffect(() => {}, [formData.country]);

  function updateCountry(value) {
    setRegion(value, "country");
    let statesX = data.filter((item) => {
      return item.country === value;
    });

    statesX = [...new Set(statesX.map((item) => item.subcountry))];
    statesX.sort();
    setStatesDup((prev) => {
      return statesX;
    });
    setStates((prevStates) => {
      return statesX;
    });
  }

  function updateState(value) {
    setRegion(value, "state");

    let cities = data.filter((city) => city.subcountry === value);
    cities = cities.map((city) => city.name);
    cities.sort();
    setCitiesDup(cities);
    setCities(cities);
  }

  function updateCity(value) {
    setRegion(value, "city");
  }

  function updateRegion(location, name) {
    if (name === "country") {
      updateCountry(location, name);
    } else if (name === "state") {
      updateState(location, name);
    } else if (name == "city") {
      updateCity(location, name);
    }
  }
  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setData((prevData) => {
          return res.data;
        });

        setRegions((prevData) => {
          return ["Canada", "United States"];
          //return [...new Set(res.data.map((item) => item.country))].sort();
        });
        setOptions((prevData) => {
          return ["Canada", "United States"];
          //return [...new Set(res.data.map((item) => item.country))].sort();
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Cont>
      <section>
        <h5>How would you like your order to arrive?</h5>
        <p>
          You can pick it up from{" "}
          <a
            className="purple underline"
            href="https://www.google.com/maps/place/159+Country+Meadow+Dr,+Carp,+ON+K0A+1L0/data=!4m2!3m1!1s0x4cd20304b6a0e607:0x2bb4a3b98e457323?sa=X&ved=2ahUKEwjC-IHHoZj-AhX0lIkEHbEmC_AQ8gF6BAgTEAI"
          >
            159 Country Meadow Dr, Ottawa, Ontario.
          </a>
        </p>
        <p className="small mar-bottom-16">Or we can arrange to meet you.</p>
        <div
          onClick={setPickupTrue}
          className={
            pickup
              ? "mar-bottom-16 select select-active "
              : "mar-bottom-16 select"
          }
        >
          <h5 className="light">Pickup</h5>
        </div>
        <br />
        <div className="flex-inline align-center">
          <div
            onClick={setPickupFalse}
            className={
              !pickup
                ? "select select-active mar-right-16"
                : "select mar-right-16"
            }
          >
            <h5 className="light">Deliver</h5>
          </div>
          <p className={!pickup ? "purple" : "contrast"}>($15)</p>
        </div>
      </section>
      <section>
        <h5 className="mar-bottom-32">Enter Your information</h5>
        <div className="input-field">
          <label htmlFor="firstName">
            <h6>First Name</h6>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={updateForm}
            value={formData.firstName}
            placeholder="First Name"
          />
          <p></p>
        </div>

        <div className="input-field">
          <label htmlFor="lastName">
            <h6>Last Name</h6>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={updateForm}
            value={formData.lastName}
            placeholder="Last Name"
          />
          <p></p>
        </div>
        <div className="input-field">
          <label htmlFor="addressOne">
            <h6>Address Line 1</h6>
          </label>
          <input
            type="text"
            name="addressOne"
            id="addressOne"
            onChange={updateForm}
            value={formData.addressOne}
            placeholder="Address Line 1"
          />
          <p></p>
        </div>
        <div className="input-field">
          <label htmlFor="addressTwo">
            <h6>Address Line 2</h6>
          </label>
          <input
            type="text"
            name="addressTwo"
            id="addressTwo"
            onChange={updateForm}
            value={formData.addressTwo}
            placeholder="Address Line 2"
          />
          <p></p>
        </div>

        <div className="flex">
          <div className="input-field">
            <label htmlFor="postal">
              <h6>Postal/Zip Code</h6>
            </label>
            <input
              type="text"
              name="postal"
              id="postal"
              onChange={updateForm}
              value={formData.postal}
              placeholder="Postal/Zip Code"
            />
            <p className="red"></p>
          </div>
          <div className="input-field">
            <label htmlFor="country">
              <h6>Country</h6>
            </label>
            <Select
              title={"Enter Country"}
              regions={regions}
              value={formData.country}
              updateValue={updateRegion}
              searchPlaceholder="Search"
              options={options}
              setOptions={setOptions}
              name="country"
            />
            <p></p>
          </div>
        </div>

        <div className="flex">
          <div className="input-field">
            <label htmlFor="province">
              <h6>State/Province</h6>
            </label>
            <Select
              title={"Enter State"}
              regions={states}
              options={statesDup}
              setOptions={setStatesDup}
              value={formData.state}
              updateValue={updateRegion}
              name="state"
            />
            <p></p>
          </div>
          <div className="input-field">
            <label htmlFor="city">
              <h6>City</h6>
            </label>
            <Select
              title={"Enter City"}
              regions={cities}
              options={citiesDup}
              setOptions={setCitiesDup}
              value={formData.city}
              updateValue={updateRegion}
              name="city"
            />
            <p></p>
          </div>
        </div>
      </section>
      <section>
        <h5 className="mar-bottom-32">What's your contact information?</h5>
        <div className="input-field">
          <label htmlFor="email">
            <h6>Email</h6>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={updateForm}
            value={formData.email}
            placeholder="Email"
          />
          <p></p>
        </div>
        <div className="input-field">
          <label htmlFor="phone">
            <h6>Phone Number</h6>
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={updateForm}
            value={formData.phone}
            placeholder="Phone Number"
          />
          <p></p>
        </div>
      </section>
    </Cont>
  );
};

export default Delivery;
