const showCart = document.getElementById("showcart");
if (showCart) {
    showCart.style.display = "none";
};


let discount = 0;
let appliedDiscountCode = "";
let discounted = false;
let giohang = new Array();
let originalTotal = 0;

function themvaogiohang(x) {
    let boxsp = x.parentElement.children;
    let hinh = boxsp[0].children[0].src;
    let gia = boxsp[1].children[0].innerText;
    let tensp = boxsp[2].innerText;
    let soluong = boxsp[3].value;
    let sp = new Array(hinh, gia, tensp, soluong);

    giohang.push(sp);


    sessionStorage.setItem("giohang", JSON.stringify(giohang));
}

function showcountsp() {
    document.getElementById("countsp").innerHTML = giohang.length;
}

function showmycart() {
    let ttgh = "";
    let tong = 0;
    for (let i = 0; i < giohang.length; i++) {
        let tt = parseInt(giohang[i][1]) * parseInt(giohang[i][3]);
        tong += tt;
        ttgh += '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td><img src="  ' + giohang[i][0] + ' " alt=""></td>' +
            '<td>' + giohang[i][2] + '</td>' +
            '<td>' + giohang[i][1] + '</td>' +
            '<td>' + giohang[i][3] + '</td>' +
            '<td>' +
            '<div> + ' + tt + '</div>' +
            '</td>' +
            '<td>' +
            '<div>' +
            '<select name="artists" id="artists">' +
            '<option value="1">Nguyen Van A</option>' +
            '<option value="2">Nguyen Van A 2</option>' +
            '<option value="3">Nguyen Van A 3</option>' +
            '<option value="4">Nguyen Van A 4</option>' +
            '</select>' +
            '</div>' +
            '</td>' +
            '<td>' +
            '</td>' +
            '<td>' +
            '<button onclick="xoa(this)">x</button>' +
            '</td>' +
            '</tr>';
    }
    ttgh += '<tr>' +
        '<th colspan="6">Tổng đơn hàng</th>' +
        `<th id='discountValue' data-discounted="false">Discount 0%</th>` +
        '<th>' +
        `<div id='totalValue'>` + tong + '</div>' +
        ' </th>' +

        '</tr>';
    document.getElementById("mycart").innerHTML = ttgh;
    console.log(tong);
    originalTotal = tong;
    return tong;
}
function showcart() {

    var x = document.getElementById("showcart");
    if (x.style.display == "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
        showmycart();
    }

}

function xoa(x) {
    var tr = x.parentElement.parentElement;
    var tensp = tr.children[2].innerText;
    tr.remove();

    for (let i = 0; i < giohang.length; i++) {
        if (giohang[i][2] == tensp) {
            giohang.splice(i, 1);
        }
        showmycart();
    }
}
function xoatatca() {
    giohang = [];
    showmycart();
}
function showgiohang_trangthanhtoan() {
    let gh = sessionStorage.getItem("giohang");
    let giohang = JSON.parse(gh);
    let ttgh = "";
    let tong = 0;
    for (let i = 0; i < giohang.length; i++) {
        let tt = parseInt(giohang[i][1]) * parseInt(giohang[i][3]);
        tong += tt;
        ttgh += '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td><img src="  ' + giohang[i][0] + ' " alt=""></td>' +
            '<td>' + giohang[i][2] + '</td>' +
            '<td>' + giohang[i][1] + '</td>' +
            '<td>' + giohang[i][3] + '</td>' +
            '<td>' +
            '<div> + ' + tt + '</div>' +
            '</td>' +
            '</tr>';
    }
    ttgh += '<tr>' +
        '<th colspan="4">Tổng đơn hàng</th>' +
        `<th id='discountValue' data-discounted=${sessionStorage.getItem("discounted") ? sessionStorage.getItem("discounted") : false}> Discount ${sessionStorage.getItem("discount_percentage") ? sessionStorage.getItem("discount_percentage") : 0}%</th>` +
        '<th>' +
        `<div id='totalValue'> ${sessionStorage.getItem("discounted_total") ? sessionStorage.getItem("discounted_total") : 0}` + '</div>' +
        ' </th>' +

        '</tr>';
    document.getElementById("mycart_thanhtoan").innerHTML = ttgh;
}



const updateTotal = (tong, discount) => {
    let totalValue = document.getElementById('totalValue');
    let discountValue = document.getElementById('discountValue');
    let currentDiscountCode = document.getElementById('mgg').value;
    if (totalValue && discount > 0 && discounted === false) {
        discounted = true;
        appliedDiscountCode = document.getElementById('mgg').value;
        totalValue.innerText = tong = String(tong - (tong * discount / 100));

    } else if (discounted === true) {
        if (currentDiscountCode !== appliedDiscountCode) {
            discounted = false;
            updateTotal(originalTotal, discount);
        } else {
            totalValue.innerText = tong;

        }
    } else if (discounted === true && currentDiscountCode === '') {
        tong = totalValue = originalTotal;
    }
    sessionStorage.setItem("discount_percentage", String(discount));
    sessionStorage.setItem("discounted", String(discounted));
    sessionStorage.setItem("discounted_total", String(tong));

}

function checkMaGiamGia() {
    const discountValue = document.getElementById('discountValue');
    const mgg = document.getElementById("mgg").value;
    let tong = parseInt(document.getElementById('totalValue').innerText);
    let discount = 0;
    switch (mgg) {
        case 'TU10':
            discount = 10;
            break;
        case 'BAO15':
            discount = 15;
            break;
        case 'KHANH20':
            discount = 20;
            break;
        case 'HINH25':
            discount = 25;
            break;
        default:
            discount = 0;
    }
    if (discountValue) {
        discountValue.innerText = `Discount ${discount}%`;
    }
    updateTotal(tong, discount);
}
