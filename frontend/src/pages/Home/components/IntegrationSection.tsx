import React, { useMemo } from "react";

const IntegrationSection = () => {
  const integrations = useMemo(() => {
    return [
      {
        id: 2,
        name: "Analytics",
        image:
          "https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg",
        title: "Google Analytics tutorial",
        link: "",
      },
      {
        id: 5,
        name: "My Business",
        image:
          "https://www.gstatic.com/bfe/images/favicon/logo_google_my_business_512dp.svg",
        title: "Google My Business tutorial",
        link: "",
      },
      {
        id: 1,
        name: "Namecheap",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjQ0LjQiIHkxPSI0Ni43MiIgeDI9IjU5LjAxIiB5Mj0iMTUuMzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkNDIwMmMiLz48c3RvcCBvZmZzZXQ9Ii4xIiBzdG9wLWNvbG9yPSIjZGMzZDI5IiBzdG9wLW9wYWNpdHk9Ii43OSIvPjxzdG9wIG9mZnNldD0iLjIiIHN0b3AtY29sb3I9IiNlNDU5MjYiIHN0b3Atb3BhY2l0eT0iLjU4Ii8+PHN0b3Agb2Zmc2V0PSIuMzIiIHN0b3AtY29sb3I9IiNlYjcxMjMiIHN0b3Atb3BhY2l0eT0iLjQiLz48c3RvcCBvZmZzZXQ9Ii40MyIgc3RvcC1jb2xvcj0iI2YwODUyMSIgc3RvcC1vcGFjaXR5PSIuMjUiLz48c3RvcCBvZmZzZXQ9Ii41NSIgc3RvcC1jb2xvcj0iI2Y1OTQxZiIgc3RvcC1vcGFjaXR5PSIuMTQiLz48c3RvcCBvZmZzZXQ9Ii42OCIgc3RvcC1jb2xvcj0iI2Y4OWYxZSIgc3RvcC1vcGFjaXR5PSIuMDYiLz48c3RvcCBvZmZzZXQ9Ii44MiIgc3RvcC1jb2xvcj0iI2Y5YTUxZCIgc3RvcC1vcGFjaXR5PSIuMDIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYWE3MWQiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMTY2Ny45MSIgeTE9IjkzNy4zMiIgeDI9IjE2ODIuNTIiIHkyPSI5MDUuOTgiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoMTgwIDg0My43NSA0NzcuMykiIHhsaW5rOmhyZWY9IiNhIi8+PC9kZWZzPjxwYXRoIGQ9Ik01Ni45MyAxNWE1LjcgNS43IDAgMCAwLTUgM2wtLjEzLjIzLTQuNSA4Ljg4LTUuNyAxMS4yMiAzLjczIDcuMzUuMjEuNDFBNS44MyA1LjgzIDAgMCAwIDQ4IDQ4LjRhNS44MyA1LjgzIDAgMCAwIDIuNDktMi4zNWwuMi0uNDEgMTEuMi0yMiAuMjctLjUzYTUuNjEgNS42MSAwIDAgMCAuNDktMi4zMkE1Ljc0IDUuNzQgMCAwIDAgNTYuOTMgMTV6TTIyLjM5IDI1LjY4bC0zLjcyLTcuMzItLjIxLS4zNkE1Ljg2IDUuODYgMCAwIDAgMTYgMTUuNmE1Ljg4IDUuODggMCAwIDAtMi41MSAyLjRsLS4yLjQtMTEuMiAyMi4wMS0uMjcuNTNBNS43NCA1Ljc0IDAgMCAwIDEyLjA5IDQ2bC4xMi0uMjMgNC41MS04Ljg4IDUuNjktMTEuMjF6IiBmaWxsPSIjZmY1MTAwIi8+PHBhdGggZD0iTTU2LjkyIDE1YTUuNzMgNS43MyAwIDAgMC01IDNsLS4xMi4yMy00LjUgOC44OC01LjcgMTEuMjIgMy43MyA3LjM1LjIxLjQxQTUuODMgNS44MyAwIDAgMCA0OCA0OC40YTUuODggNS44OCAwIDAgMCAyLjQ5LTIuMzVsLjItLjQxIDExLjItMjIgLjI3LS41M2E1LjYxIDUuNjEgMCAwIDAgLjQ5LTIuMzJBNS43NCA1Ljc0IDAgMCAwIDU2LjkyIDE1eiIgZmlsbD0idXJsKCNhKSIvPjxwYXRoIGQ9Ik03LjA3IDQ5YTUuNzEgNS43MSAwIDAgMCA1LTNsLjEyLS4yMyA0LjUxLTguODggNS43LTExLjIyLTMuNzMtNy4zNS0uMi0uMzJBNS44MyA1LjgzIDAgMCAwIDE2IDE1LjZhNS43NyA1Ljc3IDAgMCAwLTIuNTEgMi40bC0uMjEuNDEtMTEuMTkgMjItLjI3LjUzYTUuNjEgNS42MSAwIDAgMC0uNDkgMi4zMkE1Ljc0IDUuNzQgMCAwIDAgNy4wNyA0OXoiIGZpbGw9InVybCgjYikiLz48cGF0aCBkPSJNMjIuMzkgMjUuNjhsLTMuNzItNy4zMi0uMjEtLjM2QTUuNzcgNS43NyAwIDAgMCAxNiAxNS42YTYgNiAwIDAgMSAxLjA5LS40MSA1Ljc2IDUuNzYgMCAwIDEgMS40Mi0uMTloNy44MWE1Ljc4IDUuNzggMCAwIDEgNSAyLjk1bC4yMS40MSAxMC4wOCAyMCAzLjcyIDcuMzIuMi40MUE1Ljg4IDUuODggMCAwIDAgNDggNDguNGE1Ljc0IDUuNzQgMCAwIDEtMi41NC42aC03LjhhNS43OCA1Ljc4IDAgMCAxLTUtMi45NGwtLjItLjQxeiIgZmlsbD0iI2ZmOGM0NCIvPjwvc3ZnPg==",
        title: "Namecheap website",
        link: "",
      },
      {
        id: 4,
        name: "Netlify",
        image: "/images/netlify.png",
        title: "Netlify website",
        link: "",
      },
      {
        id: 3,
        name: "Bungkusit",
        image: "/images/bungkusit.png",
        title: "Bungkusit website",
        link: "",
      },
    ];
  }, []);

  return (
    <section className="flex w-full justify-center items-center flex-col py-16 bg-gray-100">
      <h1 className="leading-none text-4xl font-bold">Integrations</h1>
      <div className="text-gray-500 mt-6 mb-8">
        Synchronize your applications with all social networks for better
        management.
      </div>

      <div className="grid grid-cols-5 gap-6">
        {integrations
          .sort((a, b) => a.id - b.id)
          .map((integration) => (
            <div
              title={integration.title}
              key={integration.id}
              style={{ width: "180px", height: "180px" }}
              className={`cursor-pointer bg-white transition duration-200 hover:shadow-2xl shadow-md rounded flex justify-center items-center flex-col font-bold p-3 text-center transform hover:-translate-y-1.5 ${
                integration.id % 2 === 0 ? "" : "mt-8"
              }`}
            >
              <img src={integration.image} alt="" className="h-16 w-16 mb-5" />
              <div>{integration.name}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default IntegrationSection;
