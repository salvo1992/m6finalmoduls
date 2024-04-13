import React, { useState } from 'react';
import AxiosClient from '../../client/client';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

    const client = new AxiosClient();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await client.post('/login', formData);
            if (response.token) {
                localStorage.setItem('auth', JSON.stringify(response.token));
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            }
        } catch (error) {
            setError('Credenziali non valide. Riprova.');
        }
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginWithGithub = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
    };
    
    

    return (
        <>
            <form onSubmit={onSubmit} className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                    <img
                        src="https://picsum.photos/340/340"
                        className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                        width="200px"
                        alt="profile"
                    />
                </div>

                <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="email"
                        className="form-control"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Inserisci la tua email..."
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Inserisci la tua password"
                        required
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-5 mb-5 w-100">
                        Login
                    </button>
                </div>

                <div
                    onClick={() => toggleForm()}
                    id="emailHelp"
                    className="form-text text-center mb-5 text-dark"
                >
                    Non sei registrato?
                    <a href="#!" className="text-dark fw-bold ms-1">
                        Registrati ora!
                    </a>
                </div>
            </form>
            <div className="px-5">
                <button
                    onClick={handleLoginWithGithub}
                    className="btn btn-dark px-5 mb-5 w-100"
                >
                    <span className="me-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-github"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                            />
                        </svg>
                    </span>
                    Login con Github
                </button>
            </div>
        </>
    );
};

export default LoginForm;

