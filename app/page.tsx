"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import Image from "next/image";


interface UserData {
  nama: string;
  nim: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "db_porto"));
        const data = querySnapshot.docs.map((doc) => doc.data() as UserData);

        if (data.length > 0) {
          setUserData(data[0]);
        } else {
          setError("No user data found");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="wrapper">
      <div className="card">
        <h1 className="me">About me</h1>
        <div className="doc">
        <Image src="/images/photo.jpg" alt="photo" width={200} height={200} />
          {userData ? (
            <>
              <h1>Hello everyone I'm {userData.nama}, NPM {userData.nim}.</h1>
            </>
          ) : (
            <h1>No user data available</h1>
          )}
          <h2>
            This landing page was created using HTML & CSS as a form of making
            assignments from front-end design courses.
          </h2>
        </div>
        <div className="accordion">
          <h2 className="accordion-header" onClick={() => toggleAccordion()}>
            What technologies were used to build this website? <span>▼</span>
          </h2>
          <div className="accordion-content">
            <p>
              This website was built using React.js & Typescript technology as the main
              framework for user interface development. React.js was chosen
              because of its ability to create dynamic components and provide a
              responsive experience for users. For the backend, Firebase is
              integrated into this application to provide a robust and easy-to-use
              service. Firebase is used as a cloud platform that manages user
              authentication, real-time databases, and hosting of this website. In
              terms of design, the entire appearance and layout of this website was
              built using only Native CSS.
            </p>
          </div>
        </div>
        <div className="footer">
          <a href="https://www.instagram.com/ma_sa1ful" target="_blank">
          <Image src="/images/instagram.png" alt="photo" width={50} height={50} />
          </a>
          <a href="https://github.com/saifulanwarm" target="_blank">
          <Image src="/images/github.png" alt="photo" width={50} height={50} />
          </a>
        </div>
      </div>
    </div>
  );
}

function toggleAccordion() {
  const accordionContent = document.querySelector(".accordion-content");
  accordionContent?.classList.toggle("hidden");
}