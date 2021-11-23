var blacklist = new Set(); //用户黑名单
blacklist.add("https://www.zhihu.com/people/jing-dong-46-34"); //营销号
//对于已经加载的答案，屏蔽掉带货或者被列入黑名单的用户的回答
var initial_answers = document.getElementsByClassName("List-item");
for (var i = 0; i < initial_answers.length; i++){
    let elem = initial_answers[i];
    check_hide_user(elem);
}

// 观察器的配置（需要观察什么变动）
const targetNode = document.getElementById("QuestionAnswers-answers");
const config = {childList: true, subtree: true};
const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        for (const target of mutation.addedNodes) {
            check_hide_user(target);
            check_hide_ad(target);
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);



//**************************** functions ****************************//
function check_hide_user(elem){
    if (elem.getAttribute("class") === "List-item"){
        let user_url = elem.querySelector("meta[itemprop='url']").getAttribute("content");
        console.log("loaded " + user_url + "'s answer!");
        if (blacklist.has(user_url)){
            elem.hidden = true;
            console.log(user_url + " is removed!");
        } else{
            console.log("but not in blacklist");
        }
    }
}

function check_hide_ad(elem){
    if (elem.className === "adsbox" || elem.className === "ecommerce-ad-box" || elem.className === "RichText-MCNLinkCardContainer") {
        let answer = elem.closest(".List-item");
        answer.hidden = true;
    }
}