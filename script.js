const cards = document.querySelectorAll(".card");

cards.forEach((card,index)=>{

    card.style.animation = `float ${3 + index}s ease-in-out infinite`;

});

const style = document.createElement("style");

style.innerHTML = `
@keyframes float{
    0%{
        transform:translateY(0px);
    }
    50%{
        transform:translateY(-15px);
    }
    100%{
        transform:translateY(0px);
    }
}
`;

document.head.appendChild(style);