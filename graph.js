function draw() {

  var n = document.getElementById("number_of_shell").value;
  var r = document.getElementById("size").value;
  u = [];

  for (var i = 1; i <= n; i++) {
    // 10i^3 + 15i^2 + 11i + 3
    x = (10 * i * i * i + 15 * i * i + 11 * i + 3) / 3;

    // 10i^2 + 2
    y = 10 * i ** 2 + 2;

    u.push([i, x, y]);
  }

  percentage_atoms_in_bulk = [];
  percentage_atoms_on_surface = [];
  particle_size = [];

  // # Applying Formula

  for (var w = 1; w <= 100; w++) {
    percentage_atoms_in_bulk.push(
      (100 * (10 * w * w * w - 15 * w * w + 11 * w - 3)) /
        (10 * w * w * w + 15 * w * w + 11 * w + 3)
    );
    percentage_atoms_on_surface.push(
      (300 * (10 * w * w + 2)) / (10 * w * w * w + 15 * w * w + 11 * w + 3)
    );
    particle_size.push((2 * w + 1) * r);
  }

  let element = "";
  var k = 1;
  for (var row = 0; row < u.length; row++) {
    element += `<tr>
      <th scope="row">${k}</th>`;
    for (var cell = 0; cell < u[row].length; cell++) {
      element += `<td>${u[row][cell]}</td>`;
    }
    element += `</tr>`;
    k = k + 1;
  }
  console.log(element);

  updateTable();

  var tabBody, row, cell;
  function updateTable() {
    console.log("table");
    document.getElementById(
      "table-form"
    ).innerHTML = `<table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Number of Shells</th>
          <th scope="col">Total number of atoms</th>
          <th scope="col">Surface atoms</th>
        </tr>
      </thead>
      <tbody>
        ${element}
      </tbody>
    </table>`;
  }

  var trace1 = {
    x: particle_size,
    y: percentage_atoms_on_surface,
    mode: "lines",
    type: "scatter",
    name: "% Surface Atoms with Particle Size"
  };

  var trace2 = {
    x: particle_size,
    y: percentage_atoms_in_bulk,
    mode: "lines",
    type: "scatter",
    name: "% Bulk Atoms with Particle Size"
  };

  var data = [trace1, trace2];

  var layout = {
    showlegend: true,
    legend: {
      x: 1,
      // xanchor: 'right',
      y: 0.5
    },
    title: {
      text:'Graph showing % of atoms in Bulk/Surface versus Particle Size',
      font: {
        // family: 'Courier New, monospace',
        size: 20
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Size of Particle in Angstrom',
        font: {
          // family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: '% Atoms in Bulk/Surface',
        font: {
          // family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };

  Plotly.newPlot("finalPlot", data, layout);
}
