import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const CancelDeletion = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      // fetch(`http://localhost:8000/api/v1/user/cancel-deletion/${userId}`, {
       fetch(`https://zaykahub-food-app.onrender.com/api/v1/user/cancel-deletion/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to cancel deletion");
          return response.json();
        })
        .then(() => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Account deletion has been successfully canceled.",
            confirmButtonColor: "#28a745",
          }).then(() => navigate("/")); // Redirect after clicking OK
        })
        .catch(() => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to cancel account deletion. Please try again.",
            confirmButtonColor: "#d33",
          });
        });
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Invalid Request!",
        text: "User ID is missing. Please check the email link.",
        confirmButtonColor: "#d33",
      });
    }
  }, [userId, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        {loading ? (
          <>
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing your request...</p>
          </>
        ) : (
          <p className="text-gray-500">Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default CancelDeletion;
