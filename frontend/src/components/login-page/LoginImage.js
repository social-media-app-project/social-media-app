import "./LoginImage.css";
import image from "./water-image.jpg";

function LoginImage() {
    return <div className="login-image-container">
        <img src={image} alt="Waves on a beach" className="login-image" />
    </div>

}

export default LoginImage;