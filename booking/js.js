function them(x) {
    var tr = x.parentElement.parentElement;
    var td = tr.children;
    var msdv = td[0].innerHTML;
    var dichvu = td[1].children[0].innerHTML;
    var dongia = td[2].children[0].innerHTML;
    var magiamgia = document.getElementById("mgg").value;

    var giohang_tr = document.createElement("tr");
    var giohang_td = document.createElement("td");

    var giohang_td_msdv = document.createTextNode(msdv);
    giohang_td.appendChild(giohang_td_msdv);
    giohang_tr.appendChild(giohang_td);
    //---------------------
    var giohang_td = document.createElement("td");
    var giohang_td_dichvu = document.createTextNode(dichvu);
    giohang_td.appendChild(giohang_td_dichvu);
    giohang_tr.appendChild(giohang_td);
    //-------------------
    var giohang_td = document.createElement("td");
    var giohang_td_dongia = document.createTextNode(dongia);
    giohang_td.setAttribute('class', 'service-item-price');
    giohang_td.appendChild(giohang_td_dongia);
    giohang_tr.appendChild(giohang_td);

    var giohang_td = document.createElement("td");
    var giohang_td_nut = document.createElement("input");
    giohang_td_nut.type = "button";
    giohang_td_nut.value = "x";
    giohang_td_nut.setAttribute("onclick", "xoa(this)")
    giohang_td.appendChild(giohang_td_nut);
    giohang_tr.appendChild(giohang_td);


    ////
    var giohang = document.getElementById("giohang");
    giohang.appendChild(giohang_tr);

    //-------------------------------------------

    //tinh tong don hang
    updateTongGioHang();
}


function xoa(x) {
    var tr = x.parentElement.parentElement;
    tr.remove();
    updateTongGioHang();
}
const checkMaGiamGia = () => {
    let giamGia = document.getElementById('phanTramGiamGia');
    let mgg = document.getElementById('mgg').value;

    let phanTramGiamGia = 0;
    switch (mgg) {
        case 'TU10':
            phanTramGiamGia = 10;
            break;
        case 'BAO15':
            phanTramGiamGia = 15;
            break;
        case 'KHANH20':
            phanTramGiamGia = 20;
            break;
        case 'HINH25':
            phanTramGiamGia = 25;
            break;
        default:
            phanTramGiamGia = 0;
            break;
    };
    
    phanTramGiamGia !== 0 ? giamGia.innerHTML = `${String(phanTramGiamGia)}%` : giamGia.innerHTML = `0%`;
    updateTongGioHang();

}

const updateTongGioHang = () => {
    let phanTramGiamGia = document.getElementById('phanTramGiamGia').innerHTML;
    let tongThanhTien = document.getElementById('tongdonhang');
    phanTramGiamGia.replace('/VND/i').trim();

    let total = 0;
    const serviceList = document.querySelectorAll('.service-item-price');
    serviceList.forEach(service => {
        total += parseInt(service.innerHTML);
    });

    if (total === 0) {
        document.getElementById('mgg').setAttribute('disabled', true);
        document.getElementById('mgg').value = "";
        document.getElementById('phanTramGiamGia').innerHTML = `0%`;
    } else {
        document.getElementById('mgg').removeAttribute('disabled');
    };

    total = total - (total * parseInt(phanTramGiamGia) / 100);

    tongThanhTien.innerHTML = "";
    tongThanhTien.innerHTML = `${String(total)} $`;
};