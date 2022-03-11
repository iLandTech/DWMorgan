export function passwordChecker(payload) {
  const url = "https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength";
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }

  return fetch(url, options)
    .then((res) => res.json())
    .catch((error) => error)
}