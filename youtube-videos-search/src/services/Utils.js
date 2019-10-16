class Utils{
    static cutString(string, size){
        return string.length <= size ? string : string.slice(0, size) + "...";
    }
}

export default Utils;