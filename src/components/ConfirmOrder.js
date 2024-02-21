import { Card, Button, Result } from "antd";
import { Link } from "react-router-dom";
import { generateRandomNumber } from "../helpers";


const ConfirmOrder = (props) => {
  const { handleKeepShopping } = props;

  return (
    <>
    <Card>
      <Result
        status="success"
        title="Your Floral Elegance Has Been Reserved!"
        subTitle={`Order Number: ${generateRandomNumber()} Your selection is confirmed and underway. `}
      />
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Link to="/" onClick={handleKeepShopping}>
          <Button style={{ fontSize: "18px", fontWeight: "bold",height:"50px",width:"200px",backgroundColor:"#ffe6e6" }}>Keep Shopping</Button>
        </Link>
      </div>
    </Card>
    </>
  );
};

export default ConfirmOrder;
