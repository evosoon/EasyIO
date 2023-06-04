export default function(){
    var date = new Date();
    let hour = date.getHours();
    if (hour >= 5 && hour < 12) return "早上好";
    else if (hour >= 12 && hour < 18) return "下午好";
    else return "晚上好";
}