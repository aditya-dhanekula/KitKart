import Carousel from 'react-bootstrap/Carousel'
import LinkContainer from 'react-router-bootstrap/LinkContainer'

const ProductCarouselComponent = () => {
    const cursorP = {
        cursor: 'pointer'
    }
    return (
        <Carousel>
            <Carousel.Item>
                <img
                crossOrigin='anonymous'
                className="d-block w-100"
                style = {{height: "300px", objectFit: "cover"}}
                src="/images/carousel/carousel-1.png"
                alt="First slide"
                />
                <Carousel.Caption>
                    <LinkContainer style={cursorP} to="/product-details">
                        <h3>Best Seller in Laptops Category</h3>
                    </LinkContainer>
                    <p>Dell XPS 15 Laptop, 15.6 inch display</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                crossOrigin='anonymous'
                className="d-block w-100"
                style = {{height: "300px", objectFit: "cover"}}
                src="/images/carousel/carousel-2.png"
                alt="Second slide"
                />

                <Carousel.Caption>
                    <LinkContainer style={cursorP} to="/product-details">
                        <h3>Best Seller in Books Category</h3>
                    </LinkContainer>
                    <p>Percy Jackson and The Lightning Thief by Rick Riordan</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                style = {{height: "300px", objectFit: "cover"}}
                src="/images/carousel/carousel-3.png"
                alt="Third slide"
                />

                <Carousel.Caption>
                    <LinkContainer style={cursorP} to="/product-details">
                        <h3>Best Seller in Cameras Category</h3>
                    </LinkContainer>
                    <p>4K Camcoder Video Camera 60FPS 48MP Vlogging Camera for Youtube WiFi 16x Digital Camera</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default ProductCarouselComponent