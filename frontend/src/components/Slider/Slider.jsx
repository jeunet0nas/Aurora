import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Slider.css"; // Import file CSS

function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src="https://i.imgur.com/wXcqZ6x.jpeg" alt="" />
        <Carousel.Caption>
          <h3>Sherlock Holmes Series</h3>
          <p>
            Đắm chìm vào những bí ẩn phức tạp và gay cấn cùng thám tử vĩ đại
            Sherlock Holmes, người sử dụng tài trí và quan sát xuất sắc để giải
            quyết những vụ án khó khăn nhất.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.imgur.com/Ju8NDcc.jpeg" alt="" />
        <Carousel.Caption>
          <h3>Harry Potter Series</h3>
          <p>
            Bước vào thế giới phép thuật đầy huyền bí và kỳ diệu của Harry
            Potter, nơi những phù thủy trẻ tuổi đối đầu với thế lực hắc ám để
            bảo vệ Hogwarts và tất cả những gì họ yêu thương.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.imgur.com/dxuosMi.png" alt="" />
        <Carousel.Caption>
          <h3>Lord of the Rings Series</h3>
          <p>
            Thả mình vào vùng đất Trung Địa với cuộc phiêu lưu kỳ diệu, nơi
            những người hùng và ác quỷ tranh đấu để quyết định số phận của thế
            giới trong "Lord of the Rings
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
