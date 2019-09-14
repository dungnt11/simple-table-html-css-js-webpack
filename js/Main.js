export default class Main {
  constructor() {
    this.checked = document.querySelectorAll("input[type=checkbox]");
    this.thead = document.querySelectorAll("#myTable th");
    this.table = document.getElementById("myTable");
    this.status = null;
    this.sort = false;
    this._event();
  }

  _event() {
    /** Change background and content corresponding with fail or success status */
    this.checked.forEach(item => {
      const that = this;
      item.addEventListener("change", function() {
        const _tdNode = this.parentNode.parentNode.childNodes;
        const tdNode = _tdNode[_tdNode.length - 2];
        const trNode = this.parentNode.parentNode;
        if (this.checked) {
          that.addOrRemoveClas(tdNode, "fail-color", "remove");
          that.addOrRemoveClas(tdNode, "success-color", "add");
          that.addOrRemoveClas(trNode, "success-bg", "add");
          that.addOrRemoveClas(trNode, "fail-bg", "remove");
          tdNode.innerHTML =
            '<i class="fa fa-check-circle" aria-hidden="true"></i> success</td>';
        } else {
          that.addOrRemoveClas(tdNode, "fail-color", "add");
          that.addOrRemoveClas(tdNode, "success-color", "remove");
          that.addOrRemoveClas(trNode, "success-bg", "remove");
          that.addOrRemoveClas(trNode, "fail-bg", "add");
          tdNode.innerHTML =
            '<i class="fa fa-times-circle" aria-hidden="true"></i> fail';
        }
      });
    });

    /** Handle sort thead when click  */
    this.thead.forEach((thead, index) => {
      const that = this;
      thead.addEventListener("click", function() {
        that.sort = !that.sort;
        if (that.sort) {
          /** Reset inner HTML all node */
          this.parentNode.childNodes.forEach(
            th => (th.innerHTML = th.innerText)
          );

          /** Append Node  */
          const iconArrowUp = document.createElement("i");
          iconArrowUp.classList.add("fa", "fa-arrow-up");
          iconArrowUp.setAttribute("aria-hidden", "true");
          this.appendChild(iconArrowUp);

          /** Sort Table */
          that.sortTable(index, "asc");
        } else {
          /** Reset inner HTML all node */
          this.parentNode.childNodes.forEach(
            th => (th.innerHTML = th.innerText)
          );

          /** Append Node  */
          const iconArrowUp = document.createElement("i");
          iconArrowUp.classList.add("fa", "fa-arrow-down");
          iconArrowUp.setAttribute("aria-hidden", "true");
          this.appendChild(iconArrowUp);

          /** Sort Table */
          that.sortTable(index, "desc");
        }
      });
    });
  }

  addOrRemoveClas(node, className, add = "add") {
    if (add === "add") {
      node.classList.add(className);
    } else {
      node.classList.remove(className);
    }
  }

  sortTable(n, dir = "asc") {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      switchcount = 0;
    table = this.table;
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;

      /** Exclude thead */
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        /** Neu cac hang da dung thu tu thi thoi */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
