import React from "react";
import { HeartIcon } from '@heroicons/react/24/outline';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router";

export default function WishlistButton({ product, setFlashMessage, buttonClassName, iconClassName }) {
    const navigate = useNavigate();

    const handleClick = async (event) => {
        // Evitamos cualquier comportamiento por defecto y propagación
        event.preventDefault();
        event.stopPropagation(); 

        // Obtenemos el usuario ACTUAL en el momento del click
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            localStorage.setItem('sj_flashMessage',JSON.stringify({message:'Please login to view your Wishlist.',type:'info'}))

            navigate('/login');
            return;
        }

        try {
            const response = await UserService.setWish(currentUser, product.id);

            if (response?.data?.message === 'ok') {
                setFlashMessage(JSON.stringify({ 'message': 'Item added to your wishlist!', 'type': "success" }));
            } else if (response?.data?.message === 'duplicate') {
                setFlashMessage(JSON.stringify({ 'message': 'Item already in your wishlist!', 'type': "info" }));
            }
        } catch (error) {
            console.error("Error en Wishlist:", error);
            
            if (error.response?.statusCode === '401 Unauthorized') {

                localStorage.setItem('sj_flashMessage',JSON.stringify({message:'Please login to view your Wishlist.',type:'info'}))
                AuthService.removeCurrentUser();
                navigate('/login'); // En lugar de reload, redirige
            }
            
            const errorMessage = error.response?.data?.message || 
            "Something went wrong" ;
            setFlashMessage(JSON.stringify({ 'message': errorMessage, 'type': "error" }));
        }
    };

    return (
        <button 
            type="button" // <--- Crucial para evitar submits accidentales
            className={`${buttonClassName}`}
            onClick={handleClick}
        >
            <span className="sr-only">Add to Wishlist</span>
            <HeartIcon 
                aria-hidden="true" 
                className={`mx-auto group-focus:fill-red-400 stroke-zinc-600 transition-all delay-150 duration-100 group-focus:-translate-y-1 ${iconClassName}`} 
            />
        </button>
    );
}
