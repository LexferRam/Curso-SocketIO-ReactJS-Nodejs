export const getUltimos = async () => {
  const res = await fetch("http://localhost:8081/ultimos");
  const data = await res.json();
  //   console.log(data);
  return data.ultimos;
};
