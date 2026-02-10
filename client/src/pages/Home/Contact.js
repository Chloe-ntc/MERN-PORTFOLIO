import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { portfolioData } = useSelector((state) => state.root);

  if (!portfolioData) return null; // Wait for API data

  const { contact } = portfolioData;

  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-tertiary text-sm">{"{"}</p>
          {Object.keys(contact).map((key) =>
            key !== "_id" && (
              <p className="ml-5 text-sm">
                <span className="text-tertiary">{key} : </span>
                <span className="text-tertiary">{contact[key]}</span>
              </p>
            )
          )}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[200px]">
          <dotlottie-wc
            src="https://lottie.host/466f8ef9-76fe-4ca5-b3c9-2d927f2981ac/bgV1Yq0u2A.lottie"
            autoplay
            background="transparent"
            speed="1"
          ></dotlottie-wc>
        </div>
      </div>
    </div>
  );
}

export default Contact;
