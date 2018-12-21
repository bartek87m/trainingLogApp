export default (data = [], searchWord = "") => {
        return data.filter((dat) => {
            return (dat.training_body + dat.training_title).toLowerCase().includes(searchWord.toLowerCase());
        });       
}
