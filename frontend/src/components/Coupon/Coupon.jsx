import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosRequest, getConfig } from "../../helpers/config";
import {
  addCouponIdToCartItem,
  setValidCoupon,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./Coupon.css";

export default function Coupon() {
  const { token } = useSelector((state) => state.user);
  const [coupon, setCoupon] = useState({
    coupon_name: "",
  });
  const dispatch = useDispatch();

  const applyCoupon = async () => {
    try {
      const response = await axiosRequest.post(
        "apply/coupon",
        { coupon_name: coupon.coupon_name },
        getConfig(token)
      );
      if (response.data.error) {
        toast.error(response.data.error);
        setCoupon({
          coupon_name: "",
        });
      } else {
        dispatch(setValidCoupon(response.data.coupon));
        dispatch(addCouponIdToCartItem(response.data.coupon.coupon_id));
        setCoupon({
          coupon_name: "",
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi áp dụng mã giảm giá.");
    }
  };

  return (
    <Row className="coupon-row mb-3">
      <Col md={12}>
        <Form className="coupon-form d-flex justify-content-center">
          <Form.Control
            type="text"
            value={coupon.coupon_name}
            onChange={(e) =>
              setCoupon({
                ...coupon,
                coupon_name: e.target.value,
              })
            }
            className="coupon-input rounded-0"
            placeholder="Nhập mã khuyến mãi"
          />
          <Button
            className="coupon-button btn-primary rounded-0"
            disabled={!coupon.coupon_name}
            onClick={applyCoupon}
          >
            APPLY
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

// export default function Coupon() {
//   const { token } = useSelector((state) => state.user);
//   const [coupon, setCoupon] = useState({
//     coupon_name: "",
//   });
//   const dispatch = useDispatch();

//   const applyCoupon = async () => {
//     try {
//       const response = await axiosRequest.post(
//         "apply/coupon",
//         { coupon_name: coupon.coupon_name },
//         getConfig(token)
//       );
//       if (response.data.error) {
//         toast.error(response.data.error);
//         setCoupon({
//           coupon_name: "",
//         });
//       } else {
//         dispatch(setValidCoupon(response.data.coupon));
//         dispatch(addCouponIdToCartItem(response.data.coupon.coupon_id));
//         setCoupon({
//           coupon_name: "",
//         });
//         toast.success(response.data.message);
//       }
//     } catch (error) {}
//   };

//   return (
//     <div className="row mb-3">
//       <div className="col-md-12">
//         <div className="d-flex">
//           <input
//             type="text"
//             value={coupon.coupon_name}
//             onChange={(e) =>
//               setCoupon({
//                 ...coupon,
//                 coupon_name: e.target.value,
//               })
//             }
//             className="form-control rounded-0"
//             placeholder="Nhập mã khuyến mãi"
//           />
//           <button
//             className="btn btn-primary rounded-0"
//             disabled={!coupon.coupon_name}
//             onClick={applyCoupon}
//           >
//             APPLY
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
