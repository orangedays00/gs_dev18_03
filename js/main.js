let no = 1;

// G `sAcademyで習う言語＋Qiitaで上位のタグ
let tagLink = [
    {name:'HTML',url:'https://qiita.com/tags/html'},
    {name:'CSS',url:'https://qiita.com/tags/css'},
    {name:'JavaScript',url:'https://qiita.com/tags/javascript'},
    {name:'PHP',url:'https://qiita.com/tags/php'},
    {name:'MySQL',url:'https://qiita.com/tags/mysql'},
    {name:'AWS',url:'https://qiita.com/tags/aws'},
    {name:'Python',url:'https://qiita.com/tags/python'},
    {name:'Ruby',url:'https://qiita.com/tags/ruby'},
    {name:'Rails',url:'https://qiita.com/tags/rails'},
    {name:'iOS',url:'https://qiita.com/tags/ios'},
    {name:'Docker',url:'https://qiita.com/tags/docker'},
    {name:'Java',url:'https://qiita.com/tags/java'},
    {name:'初心者',url:'https://qiita.com/tags/%e5%88%9d%e5%bf%83%e8%80%85'},
    {name:'Linux',url:'https://qiita.com/tags/linux'},
    {name:'Node.js',url:'https://qiita.com/tags/node.js'},
    {name:'Python3',url:'https://qiita.com/tags/python3'},
    {name:'Git',url:'https://qiita.com/tags/git'},
    {name:'C#',url:'https://qiita.com/tags/csharp'},
    {name:'Unity',url:'https://qiita.com/tags/unity'},
    {name:'Mac',url:'https://qiita.com/tags/mac'},
    {name:'Go',url:'https://qiita.com/tags/go'},
    {name:'Vue.js',url:'https://qiita.com/tags/vue.js'},
    {name:'機械学習',url:'https://qiita.com/tags/%e6%a9%9f%e6%a2%b0%e5%ad%a6%e7%bf%92'},
    {name:'C++',url:'https://qiita.com/tags/cpp'},
    {name:'Laravel',url:'https://qiita.com/tags/laravel'},
    {name:'React',url:'https://qiita.com/tags/react'},
    {name:'Windows',url:'https://qiita.com/tags/windows'},
    {name:'GitHub',url:'https://qiita.com/tags/github'},
    {name:'Xcode',url:'https://qiita.com/tags/xcode'},
    {name:'Ubuntu',url:'https://qiita.com/tags/ubuntu'},
    {name:'RaspberryPi',url:'https://qiita.com/tags/raspberrypi'},
    {name:'TypeScript',url:'https://qiita.com/tags/typescript'},
    {name:'CentOS',url:'https://qiita.com/tags/centos'},
    {name:'DeepLearning',url:'https://qiita.com/tags/deeplearning'},
]

// キャッシュを無効にする
$.ajaxSetup({
    cache: false
});

// Qiitaの記事をとってきて表示
let getArticle = function(){
    $.get('https://qiita.com/api/v2/items',
            { page:no, per_page:"20" }
        ).done(function(data) {
            // 見出しを作成
            let thTr = document.createElement('tr');
            let thCheckBox = document.createElement('th');
            let thDate = document.createElement('th');
            let thText = document.createElement('th');
            let thTag = document.createElement('th');
            let thLgtm = document.createElement('th');

            thDate.innerHTML = '投稿日時';
            thDate.classList.add('main-list--table_line');
            thText.innerHTML = 'タイトル';
            thText.classList.add('main-list--table_line');
            thTag.innerHTML = 'タグ';
            thTag.classList.add('main-list--table_line');
            thLgtm.innerHTML = 'LGTM';
            thLgtm.classList.add('main-list--table_line');

            thTr.appendChild(thCheckBox);
            thTr.appendChild(thDate);
            thTr.appendChild(thText);
            thTr.appendChild(thTag);
            thTr.appendChild(thLgtm);
            thTr.classList.add('main-list--heading');

            document.getElementById('js_append_area').appendChild(thTr);

            // 取得した記事を一覧化する
            data.forEach((value,index) => {
                let allDate = value.created_at;

                // 取得したタグを配列化する
                let array = [];
                for(let m = 0;m<value.tags.length;m++){
                    array.push(JSON.stringify(value.tags[m].name).replace(/\"/g,""));
                }

                // タグの中から、tagLinkに合致するタグを抽出して、リンク化を行い、新しい配列に追加。
                // 元の配列からは、値を削除
                let tagArray = [];
                for(let i = 0;i<array.length;i++){
                    for(let j=0;j<tagLink.length;j++){
                        if(array[i] == tagLink[j].name){
                            const tagA = document.createElement('a');
                            tagA.setAttribute('href',`${tagLink[j].url}`);
                            tagA.setAttribute('target','_blank');
                            tagA.classList.add('main-list--table_tagtext');
                            tagA.textContent = `${tagLink[j].name},`;
                            tagArray.push(tagA);
                            array.splice(i,1);
                        }
                    }
                }

                // 日付を整形するために定義し、整形
                let checkDate = allDate.indexOf('T');
                let checkTime = allDate.indexOf('\+');
                let date = allDate.substring(0,checkDate);
                let time = allDate.substring(checkDate + 1,checkTime);
                let tr = document.createElement('tr');

                let tdCheckBox = document.createElement('td');
                let label = document.createElement('label');
                let input = document.createElement('input');

                let tdDate = document.createElement('td');
                let tdText = document.createElement('td');
                let tdTag = document.createElement('td');
                let tdLgtm = document.createElement('td');
                let a = document.createElement('a');

                input.setAttribute('type','checkbox');
                input.setAttribute('id',`check${index}`);
                label.setAttribute('for',`check${index}`);
                label.classList.add('check-box');
                tdCheckBox.appendChild(input);
                tdCheckBox.appendChild(label);
                tdCheckBox.classList.add('main-list--table_line');

                tdDate.textContent = `${date}  ${time}`;
                tdDate.classList.add('main-list--table_line','main-list--table_date');

                a.setAttribute('href', `${value.url}`);
                a.setAttribute('target','_blank');
                a.setAttribute('id',`saveValue${index}`);
                a.textContent = `${value.title}`;
                tdText.appendChild(a);
                tdText.classList.add('main-list--table_line', 'main-list--table_title');

                tdTag.setAttribute('id',`tagId${index}`);
                tdTag.classList.add('main-list--table_line','main-list--table_tag');
                // リンク化したタグがあるかどうか
                if(tagArray != null){
                    for(let p = 0;p<tagArray.length;p++){
                        tdTag.appendChild(tagArray[p]);
                    }
                }

                // リンク化しなかったタグをテキスト化
                for(let n = 0;n<array.length;n++){
                    const tagDiv = document.createElement('div');
                    tagDiv.classList.add('main-list--table_tagtext');
                    tagDiv.textContent = `${array[n]},`;
                    tdTag.appendChild(tagDiv);
                }

                tdLgtm.textContent = `${value.likes_count}`;
                tdLgtm.classList.add('main-list--table_line','main-list--table_center');

                tr.appendChild(tdCheckBox);
                tr.appendChild(tdDate);
                tr.appendChild(tdText);
                tr.appendChild(tdTag);
                tr.appendChild(tdLgtm);
                tr.classList.add('main-list--table_line');
                document.getElementById('js_append_area').appendChild(tr);

                input.setAttribute("onclick","saveStorage(this.id)");
            });
        });


}


// 前の20件を表示
document.getElementById('prev').addEventListener('click',()=>{
    document.getElementById('js_append_area').innerHTML = "";
    --no;
    getArticle();
    // １ページ目では前に戻れないため、表示を消し、クリックできないようのクラスを付与
    if(no == 1){
        document.getElementById('prev').classList.add('first-page');
    }
});


// 次の20件を表示
document.getElementById('next').addEventListener('click',()=>{
    document.getElementById('js_append_area').innerHTML = "";
    ++no;
    getArticle();
    if(no == 2){
        document.getElementById('prev').classList.remove('first-page');
    }
});


// チェックした記事をローカルストレージに保存

function saveStorage(ele){
    const saveId = ele;
    const saveIndex = saveId.indexOf('k');
    const saveNumber = saveId.slice(saveIndex + 1);
    const saveText = document.getElementById(`saveValue${saveNumber}`).textContent;
    const saveUrl = document.getElementById(`saveValue${saveNumber}`).href;

    const checkInput = document.getElementById(`check${saveNumber}`);

    const now = new Date();
    const nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    nowMonth = ('0' + nowMonth).slice(-2);
    let nowDate = now.getDate();
    nowDate = ('0' + nowDate).slice(-2);
    let nowHour = now.getHours();
    nowHour = ('0' + nowHour).slice(-2);
    let nowMin = now.getMinutes();
    nowMin = ('0' + nowMin).slice(-2);
    const nowTime = `${nowYear}-${nowMonth}-${nowDate}　${nowHour}:${nowMin}`

    const tagText = document.getElementById(`tagId${saveNumber}`).textContent;

    const saveDataList = {
        time:nowTime,
        url: saveUrl,
        tag:tagText
    }

    // チェックした場合に保存
    if(checkInput.checked){
        localStorage.setItem(saveText,JSON.stringify(saveDataList));

    }else{ //チェックを外した場合、削除
        localStorage.removeItem(saveText);
    }
}


// 保存した内容を、保存した記事一覧に表示
let saveArticle = function(){
    let thSaveTr = document.createElement('tr');
    let thSaveAllDelete = document.createElement('th');
    let aAllClear = document.createElement('a');
    let thSaveTime = document.createElement('th');
    let thSaveText = document.createElement('th');
    let thSaveTag = document.createElement('th');

    aAllClear.innerHTML = "全て削除";
    aAllClear.classList.add('main-save--button', 'main-save--button_deepgreen');
    aAllClear.setAttribute('id','allClear');
    aAllClear.setAttribute('onclick',`allClearStorage()`);
    thSaveAllDelete.appendChild(aAllClear);
    thSaveAllDelete.classList.add('main-save--table_line','main-save--table_delete');

    thSaveTime.innerHTML = '保存日時';
    thSaveTime.classList.add('main-save--table_line', 'main-save--table_date');
    thSaveText.innerHTML = 'タイトル';
    thSaveText.classList.add('main-save--table_line', 'main-save--table_title');
    thSaveTag.innerHTML = 'タグ';
    thSaveTag.classList.add('main-save--table_line', 'main-save--table_tag');

    thSaveTr.appendChild(thSaveAllDelete);
    thSaveTr.appendChild(thSaveTime);
    thSaveTr.appendChild(thSaveText);
    thSaveTr.appendChild(thSaveTag);
    thSaveTr.classList.add('main-save--heading');

    document.getElementById('js_save_area').appendChild(thSaveTr);

    for(let k = 0; k<localStorage.length; k++){
        const key = localStorage.key(k);
        const value = JSON.parse(localStorage.getItem(key));
        let tr = document.createElement('tr');

        let tdDeleteBox = document.createElement('td');
        let aDelete = document.createElement('a');

        let tdSaveTime = document.createElement('td');

        let tdSaveText = document.createElement('td');
        let aUrl = document.createElement('a');

        let tdSaveTag = document.createElement('td');


        aDelete.innerHTML = "削除する";
        aDelete.classList.add('main-save--button', 'main-save--button_green');
        aDelete.setAttribute('id',`deleteKey${k}`);
        aDelete.setAttribute('onclick',`deleteStorage(this.id)`);
        tdDeleteBox.appendChild(aDelete);
        tdDeleteBox.classList.add('main-save--table_line','main-save--table_delete');

        tdSaveTime.classList.add('main-save--table_line');
        tdSaveTime.textContent = `${value.time}`;

        aUrl.setAttribute('href', `${value.url}`);
        aUrl.setAttribute('target','_blank');
        aUrl.setAttribute('id',`deleteValue${k}`);
        aUrl.textContent = `${key}`;
        tdSaveText.appendChild(aUrl);
        tdSaveText.classList.add('main-save--table_line');

        tdSaveTag.classList.add('main-save--table_line');
        tdSaveTag.textContent = `${value.tag}`;

        tr.appendChild(tdDeleteBox);
        tr.appendChild(tdSaveTime);
        tr.appendChild(tdSaveText);
        tr.appendChild(tdSaveTag);
        tr.classList.add('main-save--table_line','main-save--table_reload');
        tr.setAttribute('id',`deleteTr${k}`)
        document.getElementById('js_save_area').appendChild(tr);
    }
}


// 内容が更新されることもあるため、保存した記事をクリックする度に最新の情報を表示
function saveTabReload(){
    document.getElementById('js_save_area').textContent = null;
    saveArticle();
    document.getElementById('saveTab').checked = true;
}


// 削除ボタンを押下した際に、ローカルストレージの値と、該当の記事を一覧から削除
function deleteStorage(ele){
        const deleteId = ele;
        const deleteIndex = deleteId.indexOf('y');
        const deleteNumber = deleteId.slice(deleteIndex + 1);
        const deleteText = document.getElementById(`deleteValue${deleteNumber}`).textContent;

        localStorage.removeItem(deleteText);
        document.getElementById(`deleteTr${deleteNumber}`).remove();
        document.getElementById('saveTab').checked = true;
}

function allClearStorage(){
    if(window.confirm('全て削除しますがよろしいですか？')){
        localStorage.clear();
        document.location.href = './index.html';
    }
}