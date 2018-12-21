

export default (training, sortBy) => {
    return training.map((train) => { //używamy map żeby zwracać kopię training
        return train;
    }).sort((a,b) => {
        if(sortBy === 'dateDown'){
            {return a.createdAt - b.createdAt}
            
        }
        else if(sortBy === 'dateUp'){
            {return b.createdAt - a.createdAt}
        }    
    });
}