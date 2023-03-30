import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import NavBarComponent from "../components/NavBarComponent";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const [getGame, setGetGame] = useState([]);
  console.log("getGame:", getGame.startEvent);
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    id: "",
    name: "",
    distance: 0,
    charge: 0,
  });

  const locations = [
    {
      id: 1,
      name: "Baghajatin, Kolkata, WB",
      distance: 10,
    },
    {
      id: 2,
      name: "Garia, Kolkata, WB",
      distance: 20,
    },
    {
      id: 3,
      name: "Sealdaha, Kolkata, WB",
      distance: 15,
    },
    {
      id: 4,
      name: "Jadavpur, Kolkata, WB",
      distance: 25,
    },
  ];

  useEffect(() => {
    const games = JSON.parse(localStorage.getItem("game"));
    if (games) {
      setGetGame(games);
    }
  }, []);

  useEffect(() => {
    const gEmail = JSON.parse(localStorage.getItem("gEmail"));
    if (!gEmail) {
      navigate("/");
    }
  }, [navigate]);

  const calculateCharge = (distance) => {
    let charge = 0;
    if (distance <= 30) {
      charge = 1500;
    } else {
      charge = 1500 + (distance - 30) * 50;
    }
    return charge;
  };

  const handleLocationChange = (event) => {
    const selectedLocation = locations.find(
      (loc) => loc.id == event.target.value
    );
    setLocation({
      id: selectedLocation.id,
      name: selectedLocation.name,
      distance: selectedLocation.distance,
      charge: calculateCharge(selectedLocation.distance * 2),
    });
  };

  const [setupDate, setSetupDate] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [durationInDays, setDurationInDays] = useState(0);
  const [durationInHours, setDurationInHours] = useState(0);

  const handleSetupDateChange = (event) => {
    setSetupDate(event.target.value);
  };

  const handleEventStartDateChange = (event) => {
    setEventStartDate(event.target.value);
  };

  const handleEventEndDateChange = (event) => {
    setEventEndDate(event.target.value);
  };

  const handleSubmit = () => {
    // Check if event end date and time is after event start date and time
    if (new Date(eventEndDate) < new Date(eventStartDate)) {
      alert(
        "Event end date and time should not be before event start date and time"
      );
      return;
    }

    // Check if event end date and time is before setup date and time
    if (new Date(eventEndDate) < new Date(setupDate)) {
      alert("Event end date and time should not be before setup date and time");
      return;
    }

    // Check if setup date and time is after event start date and time
    if (new Date(setupDate) > new Date(eventStartDate)) {
      alert(
        "Setup date and time should not be after event start date and time"
      );
      return;
    }

    // Check if setup date is more than 1 day before event start date
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    if (new Date(eventStartDate) - new Date(setupDate) > oneDayInMilliseconds) {
      alert("Setup date can not be more than 1 day before event start date");
      return;
    }

    // Calculate the duration of the event in days and hours
    const durationInMilliseconds =
      new Date(eventEndDate) - new Date(eventStartDate);
    const durationInDays = Math.floor(
      durationInMilliseconds / (24 * 60 * 60 * 1000)
    );
    const durationInHours = Math.floor(
      (durationInMilliseconds / (60 * 60 * 1000)) % 24
    );

    setDurationInDays(durationInDays);
    setDurationInHours(durationInHours);
  };

  useEffect(() => {
    handleSubmit();
  }, [eventStartDate, eventEndDate, setupDate]);

  return (
    <>
      <NavBarComponent />
      <Container>
        <h3 className="text-center mt-2">Checkout</h3>
        <Row style={{ marginTop: "80px" }}>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Card
              style={{
                boxShadow: "0px 10px 15px -3px rgba(40,612,485,0.6)",
              }}
              className="p-3 mb-5"
            >
              <h3 className="mt-3">Event Name: {getGame.gameName}</h3>
              <form
                style={{ display: "flex", justifyContent: "center" }}
                onSubmit={handleSubmit}
              >
                <label>
                  Setup Date:
                  <input
                    type="datetime-local"
                    value={setupDate}
                    onChange={handleSetupDateChange}
                    required
                  />
                </label>
                <label>
                  Event Start Date:
                  <input
                    type="datetime-local"
                    value={eventStartDate}
                    onChange={handleEventStartDateChange}
                    required
                  />
                </label>
                <label>
                  Event End Date:
                  <input
                    type="datetime-local"
                    value={eventEndDate}
                    onChange={handleEventEndDateChange}
                    required
                  />
                </label>
              </form>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                The event is going on for{" "}
                <span style={{ color: "red" }}>{durationInDays} days</span> and{" "}
                <span style={{ color: "red" }}>{durationInHours} hours</span>
              </p>
              <div>
                <p>Select Payment Methods:</p>
                <div style={{ marginTop: "-15px" }}>
                  <Form.Check
                    label="UPI"
                    type="radio"
                    value="UPI"
                    name="payment"
                  />
                  <Form.Check
                    label="Cash"
                    type="radio"
                    value="Cash"
                    name="payment"
                  />
                  <Form.Check
                    label="Online"
                    type="radio"
                    value="Online"
                    name="payment"
                  />
                  <Form.Check
                    label="Chaque"
                    type="radio"
                    value="Chaque"
                    name="payment"
                  />
                </div>
              </div>
              <Form.Select
                aria-label="Default select example"
                className="mt-2"
                onChange={handleLocationChange}
              >
                <option required value="">
                  Select a location:
                </option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </Form.Select>
              {location.id && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "40px",
                    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.5)",
                  }}
                >
                  <p>Selected location: {location.name}</p>
                  <p>Distance: {location.distance * 2}km</p>
                  <p>Transport charge: Rs. {location.charge}</p>
                </div>
              )}

              <Button
                variant="success"
                className="mt-3 mb-3"
                onClick={() => alert("Query done")}
              >
                Make Query
              </Button>
            </Card>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </>
  );
}

export default CheckOut;
