import React from "react";
import "./AboutUs.css";

const contributors = [
  { id: 22521311, content: "Phạm Nhật Tân" },
  { id: 22521312, content: "Nguyễn Đăng Tân" },
  { id: 22521313, content: "Trần Nguyễn Bảo Trâm" },
  { id: 22521314, content: "Lê Bá Vinh" },
];

export default function AboutUs() {
  return (
    <div className="about-us-page">
      <h1 className="about-us-title">ABOUT US</h1>
      <div className="about-us-introduce row justify-content-between m-0">
        <div className="about-us-content col-12 col-md-7 p-5">
          <h3 className="about-us-container-title">THE STORY OF AURORA</h3>
          <p className="about-us-description">
            Our journey began in 2024, with a vision to create a haven for book
            lovers. Founded by Nhat Tan in HCM City, Vietnam, Aurora started as
            a small bookstore with a big idea: that books have the power to
            inspire, transform, and connect us. From the beginning, we’ve been
            more than just a bookshop – we’re a community of dreamers, thinkers,
            and storytellers. With a commitment to spreading the joy of reading
            and challenging traditional book industry norms, Aurora is your
            companion in every chapter of your life. Welcome to Aurora.
          </p>
        </div>
        <img
          className="col-12 col-md-5 p-0"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/a635c8209979951.6708e51ec6836.jpg"
          alt="image"
        />
      </div>
      <div className="about-us-history">
        <div>
          <h3 className="container-title mb-3">Something about dau</h3>
          <ul>
            {contributors.map((item, index) => (
              <li key={index}>
                {item.id} - {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="about-us-discover mb-5 row justify-content-between m-0">
        <div className="about-us-content col-12 col-md-7 p-5">
          <h3 className="about-us-container-title">DISCOVER OUR PURPOSE</h3>
          <p className="about-us-description">
            Aurora exists to inspire minds and connect hearts through the power
            of books. This is our purpose, and it drives everything we do:
            promoting the love of reading, fostering lifelong learning, and
            creating a community where every story matters. Explore our
            manifesto and values that shape every chapter of Aurora's journey.
          </p>
        </div>
        <img
          className="col-12 col-md-5 p-0"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f3cbe4204315131.66a739dd330d2.png"
          alt="image"
        />
      </div>
    </div>
  );
}
