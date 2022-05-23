import "./LoginImage.css";
import image from "./water-image.jpg";

function LoginImage() {
    return <div className="login-image-container">
        <img src={image} alt="Waves on a beach" className="login-image" />
        <p className="image-credits"> Image by <a href="https://unsplash.com/@singleearth">Single.Earth</a> from <a href="https://unsplash.com">Unsplash</a> </p>
    </div>

}

export default LoginImage;