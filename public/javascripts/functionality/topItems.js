let canvas = document.getElementById("canvas");

let myChart = canvas.getContext("2d");

fetch("http://localhost:5000/getTopItems")
  .then((res) => res.json())
  .then((json) => {
    let l = json.length;

    let labels = [];
    let total = [];
    for (let i = 0; i < l; i++) {
      labels.push(json[i].item_name);
      total.push(json[i].totalBuy);
    }

    let studentsGrade = new Chart(myChart, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "none",
            data: total,
            backgroundColor: "#000",
            fontColor: "#fff",
            color: "#fff",
            borderWidth: 1,
            borderColor: "#fff",
            hoverBorderWidth: 3,
            hoverBorderColor: "black",
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Top 10 Products",
          fontsize: 25,
        },
        legend: {
          display: false,
        },
        layout: {
          padding: 5,
        },
      },
    });
  })
  .catch((e) => console.log(e));
