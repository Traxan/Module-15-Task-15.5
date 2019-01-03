App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    //PROMISE

    getGif: function (searchingText) {
        return new Promise(
            function (resolve, reject){
                var url = 'https://api.giphy.com' + '/v1/gifs/random?api_key=' + 'Ahz6kKvHoNTrwWXaZYfD2P3uhpLF60NE' + '&tag=' + searchingText; // 2.
                const request = new XMLHttpRequest();
                request.open('GET', url);
                request.onload = function () {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText).data;
                        var gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);
                    }
                    else {
                        reject(new Error(this.statusText));
                    }
                };
                request.onerror = function () {
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.statusText}`))
                }
                request.send();
            });
    },

    handleSearch: function (searchingText) {
        this.setState({
            loading: true
        });

        this.getGif(searchingText)
            .then(gif => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            })
            .catch(error => console.log('There is an error: ', error));
    },



    render: function () {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return ( 
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href = 'https://giphy.com'> giphy </a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch = {this.handleSearch}/> 
                <Gif loading = {this.state.loading} url = {this.state.gif.url} sourceUrl = {this.state.gif.sourceUrl}/>
            </div>
        );
    }
});