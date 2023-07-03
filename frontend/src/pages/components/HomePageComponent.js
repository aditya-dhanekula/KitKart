import CategoryCardComponent from "../../components/CategoryCardComponent";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

import { useEffect, useState } from "react";

const HomePageComponent = ({ categories }) => {
  const [mainCategories, setMainCategories] = useState([]);

  useEffect(() => {
    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories]);

  return (
    <>
      <ProductCarouselComponent />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;