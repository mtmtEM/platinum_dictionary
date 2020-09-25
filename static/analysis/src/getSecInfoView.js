window.onload = function(){
    const type = localStorage.vt_type;
    const param = localStorage.vt_param;
    console.log("type:", type);
    console.log("param:", param);

    if(type == 0){
        getDomainInfo(param);
    } else if (type == 1){
        getIPInfo(param);
    } else if (type == 2){
        getHashInfo(param);
    }
};

const api_key = ""; // VTのAPIキーを登録
// domain: ip, domain, hash
// param: data(ip, domain, hash)
function getDomainInfo(domain_name){
    const vt_request = new XMLHttpRequest();
    const vt_url = `https://www.virustotal.com/api/v3/domains/` + domain_name;
    vt_request.open("GET", vt_url, true);
    vt_request.setRequestHeader("x-apikey" , api_key);
    vt_request.onreadystatechange = function () {
        if (vt_request.readyState == 4){
            const report_data = JSON.parse(vt_request.responseText);

            if (report_data.data != null){
                const datas = report_data.data.attributes;
                var ant_table = document.getElementById("ant_table");
                var score_table = document.getElementById("score_table");
                var row, cell;

                // アンチウィルスソフトごとの識別結果（category, engine_name, method, result）
                for (var service in datas.last_analysis_results){
                    let i = 0;
                    console.log(service + ":");
                    console.log("\tcategory:" + datas.last_analysis_results[service]['category']);
                    console.log("\tmethod:" + datas.last_analysis_results[service]['method']);
                    console.log("\tresult:" + datas.last_analysis_results[service]['result']);

                    row = ant_table.insertRow(-1);
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(service));
                    for(var item in datas.last_analysis_results[service]){
                        i++;
                        if (i != 2){
                            console.log("\t" + item + ":" + datas.last_analysis_results[service][item]);
                            cell = row.insertCell(-1);
                            cell.appendChild(document.createTextNode(datas.last_analysis_results[service][item]));
                        }
                    }
                }
                ant_table.createCaption().innerHTML="アンチウィルスごとの分析結果";

                // 総合的な識別結果（harmless, malicious, suspicious, timeout, undetected）
                for (var stat in datas.last_analysis_stats){
                    console.log(stat + ":" + datas.last_analysis_stats[stat]);
                    row = score_table.insertRow(-1);
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(stat));
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(datas.last_analysis_stats[stat]));
                }
                score_table.createCaption().innerHTML="総合評価";
            }
        }
    };
    vt_request.send();
}

function getIPInfo(ip){
    const vt_request = new XMLHttpRequest();
    const vt_url = `https://www.virustotal.com/api/v3/ip_addresses/` + ip;
    vt_request.open("GET", vt_url, true);
    vt_request.setRequestHeader("x-apikey" , api_key);
    vt_request.onreadystatechange = function () {
        if (vt_request.readyState == 4){
            const report_data = JSON.parse(vt_request.responseText);

            if (report_data.data != null){
                const datas = report_data.data.attributes;
                var ant_table = document.getElementById("ant_table");
                var score_table = document.getElementById("score_table");
                var row, cell;

                // アンチウィルスソフトごとの識別結果（category, engine_name, method, result）
                for (var service in datas.last_analysis_results){
                    let i = 0;
                    console.log(service + ":");
                    console.log("\tcategory:" + datas.last_analysis_results[service]['category']);
                    console.log("\tmethod:" + datas.last_analysis_results[service]['method']);
                    console.log("\tresult:" + datas.last_analysis_results[service]['result']);

                    row = ant_table.insertRow(-1);
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(service));
                    for(var item in datas.last_analysis_results[service]){
                        i++;
                        if (i != 2){
                            console.log("\t" + item + ":" + datas.last_analysis_results[service][item]);
                            cell = row.insertCell(-1);
                            cell.appendChild(document.createTextNode(datas.last_analysis_results[service][item]));
                        }
                    }
                }
                ant_table.createCaption().innerHTML="アンチウィルスソフトごとの分析結果";

                // 総合的な識別結果（harmless, malicious, suspicious, timeout, undetected）
                for (var stat in datas.last_analysis_stats){
                    console.log(stat + ":" + datas.last_analysis_stats[stat]);
                    row = score_table.insertRow(-1);
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(stat));
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(datas.last_analysis_stats[stat]));
                }
                score_table.createCaption().innerHTML="総合評価";
            }
        }
    };
    vt_request.send();
}

function getHashInfo(hash){
    const vt_request = new XMLHttpRequest();
    const vt_url = `https://www.virustotal.com/api/v3/files/` + hash;
    vt_request.open("GET", vt_url, true);
    vt_request.setRequestHeader("x-apikey" , api_key);
    vt_request.onreadystatechange = function () {
        if (vt_request.readyState == 4){
            const report_data = JSON.parse(vt_request.responseText);

            if (report_data.data != null){
                const datas = report_data.data.attributes;
                var ant_table = document.getElementById("ant_table");
                var score_table = document.getElementById("score_table");
                var row, cell;

                // アンチウィルスソフトごとの識別結果（category, engine_name, method, result）
                for (var service in datas.last_analysis_results){
                    console.log(service + ":");
                    console.log("\tcategory:" + datas.last_analysis_results[service]['category']);
                    console.log("\tmethod:" + datas.last_analysis_results[service]['method']);
                    console.log("\tresult:" + datas.last_analysis_results[service]['result']);

                    row = ant_table.insertRow(-1);
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(service));
                    var i = 0;
                    for(var item in datas.last_analysis_results[service]){
                        i++;
                        if(i < 2 || i > 4){
                            console.log("\t" + item + ":" + datas.last_analysis_results[service][item]);
                            cell = row.insertCell(-1);
                            cell.appendChild(document.createTextNode(datas.last_analysis_results[service][item]));
                        }
                    }
                }
                ant_table.createCaption().innerHTML="アンチウィルスソフトごとの分析結果";

                // 総合的な識別結果（harmless, malicious, suspicious, timeout, undetected）
                for (var stat in datas.last_analysis_stats){
                    console.log(stat + ":" + datas.last_analysis_stats[stat]);
                    row = score_table.insertRow(-1);
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(stat));
                    cell = row.insertCell(-1);
                    cell.appendChild(document.createTextNode(datas.last_analysis_stats[stat]));
                }
                score_table.createCaption().innerHTML="総合評価";
            }
        }
    };
    vt_request.send();
}