//
// Battlelist tab classes
//
import * as fs   from "fs";
import * as path from "path";

import { mixin } from "../../../../../common/mixin";

import { WidgetBase } from "../../../../common/widget";
import { GuiEvents } from "../../../../backend/uberserver/events";
import { Content } from "../content";
import { Events } from "../../../../../common/events";
import { BattleListEvents } from "../../../../backend/events";


export class BattleListRowWidget extends WidgetBase<HTMLTableRowElement>
{
    private column_name:    HTMLTableDataCellElement;
    private column_players: HTMLTableDataCellElement;
    private column_game:    HTMLTableDataCellElement;
    private column_map:     HTMLTableDataCellElement;
    private column_founder: HTMLTableDataCellElement;
    private column_country: HTMLTableDataCellElement;

    private events = BattleList.instance()

    constructor()
    {
        super(document.createElement("tr"), { mode: "table-row" });

        this.column_name    = document.createElement("td");
        this.column_players = document.createElement("td");
        this.column_game    = document.createElement("td");
        this.column_map     = document.createElement("td");
        this.column_founder = document.createElement("td");
        this.column_country = document.createElement("td");

        this.container.appendChild(this.column_name);
        this.container.appendChild(this.column_players);
        this.container.appendChild(this.column_game);
        this.container.appendChild(this.column_map);
        this.container.appendChild(this.column_founder);
        this.container.appendChild(this.column_country);

        this.show();
        this.setup_dom();
    }

    public set title(title: string) {
        this.column_name.innerText = title;
    }

    public set players(players: string)
    {
        this.column_players.innerText = players;
    }

    public set game(game: string) {
        this.column_game.innerText = game;
    }

    public set map(map: string) {
        this.column_map.innerText = map;
    }

    public set founder(founder: string) {
        this.column_founder.innerText = founder;
    }

    public set country(country: string | undefined)
    {
        let uri = `./flags/${country?.toLowerCase()}.png`;

        this.column_country.style.width          = "60px";
        this.column_country.style.background     = `url(${uri})`;
        this.column_country.style.backgroundSize = `100% 100%`;
    }

    private setup_dom()
    {
        this.container.addEventListener("click", () => {
            this.events.emit("battle.selected", {battle: this});
        })
    }
}


export class BattleList extends WidgetBase<HTMLDivElement>
{
    private topspace: HTMLDivElement;

    private tablediv: HTMLDivElement;
    private thead:  HTMLTableSectionElement;
    private header: HTMLTableRowElement;
    private tbody: HTMLTableSectionElement;
    private table: HTMLTableElement;

    private lowerspace: HTMLDivElement;

    private createbtn: HTMLButtonElement;

    private controllerdiv: HTMLDivElement;
    private controller: BattleController;

    private static _instance: BattleList;

    private events = GuiEvents.instance();

    private constructor()
    {
        super(document.createElement("div"));

        this.topspace = document.createElement("div");

        this.tablediv = document.createElement("div");
        this.thead    = document.createElement("thead");
        this.table    = document.createElement("table");
        this.tbody    = document.createElement("tbody");
        this.header   = document.createElement("tr");

        this.lowerspace = document.createElement("div");

        this.createbtn = document.createElement("button");

        this.controllerdiv = document.createElement("div");
        this.controller = new BattleController();

        this.controllerdiv.appendChild(this.controller.inner());

        Content.instance().append(this.container);

        this.setup_dom();
    }

    public static instance(): BattleList
    {
        if (!BattleList._instance) {
            BattleList._instance = new BattleList()
        }

        return BattleList._instance;
    }

    private setup_dom()
    {
        this.container.id        = "battlelist";
        this.topspace.id         = "battletopspace";
        this.tablediv.id         = "battletablediv";
        this.table.id            = "battletable";
        this.header.id           = "battleheader";
        this.lowerspace.id       = "battlelowerspace";
        this.createbtn.className = "controllerbtn";
        this.createbtn.id        = "createbutton";
        this.controllerdiv.id    = "battlecontrollerdiv";

        this.createbtn.innerHTML = "Host Battle"

        this.add_header("Battle Name");
        this.add_header("Players");
        this.add_header("Game");
        this.add_header("Map");
        this.add_header("Host");
        this.add_header("Country");

        this.container.appendChild(this.topspace);

        this.thead.appendChild(this.header);
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.tablediv.appendChild(this.table);
        this.container.appendChild(this.tablediv);

        this.container.appendChild(this.lowerspace);
        this.container.appendChild(this.createbtn);
        this.container.appendChild(this.controllerdiv);

        this.setup_wiring();
    }

    private add_header(name: string)
    {
        let h       = document.createElement("th");
        h.innerText = name;

        this.header.appendChild(h);
    }

    public create_battle(): BattleListRowWidget
    {
        let battle = new BattleListRowWidget();

        this.update();
        this.tbody.appendChild(battle.inner());

        this.table.appendChild(battle.inner());
        return battle;
    }

    private update()
    {
        let idx = 0;

        for (let row of this.table.rows)
        {
            if (row.style.display == "none") {
                continue;
            }

            if (idx % 2 == 0) {
                row.className = "tr-even";
            } else {
                row.className = "tr-odd";
            }

            idx++;
        }
    }

    private setup_wiring()
    {
        this.createbtn.addEventListener("click", () => {
            this.events.emit("newbattle", {})
        })

        for (let row in this.table.rows)
        {

        }
    }
}

class BattleController extends WidgetBase<HTMLDivElement>
{
    private logodiv: HTMLDivElement;
    private logo: SVGSVGElement;

    private widget: BattleListInfoWidget;


    constructor()
    {
        super(document.createElement("div"));

        this.logodiv = document.createElement("div");
        this.logodiv.innerHTML = fs.readFileSync(
            path.join(__dirname, `../../../../../icons/spring.svg`),
            {encoding: "UTF8"}
        );
        this.logo = this.logodiv.getElementsByTagName("svg")[0];

        this.widget = new BattleListInfoWidget();

        this.container.appendChild(this.widget.inner());

        this.setup_dom();
        this.show();
    }

    private setup_dom()
    {
        this.container.id = "battlecontroller";
        this.logodiv.id   = "nothingimgdiv";

        this.container.appendChild(this.logodiv);
    }

    public display_battle()
    {

    }
}

export class BattleListInfoWidget extends WidgetBase<HTMLDivElement>
{
    private infodiv: HTMLDivElement
    private mappreview: HTMLDivElement;
    private info: HTMLDivElement;

    private join_btn: HTMLButtonElement;

    constructor()
    {
        super(document.createElement("div"), { mode: "flex" })

        this.infodiv    = document.createElement("div");
        this.mappreview = document.createElement("div");
        this.info       = document.createElement("div");

        this.join_btn = document.createElement("button");

        this.setup_dom();
    }

    private setup_dom()
    {
        this.infodiv.id    = "infowidgetinfodiv";
        this.info.id       = "infowidgetinfo";
        this.mappreview.id = "infowidgetmap";

        this.join_btn.className = "controllerbtn";
        this.join_btn.innerHTML = "Join";

        this.infodiv.appendChild(this.info);
        this.infodiv.appendChild(this.mappreview);

        this.container.appendChild(this.infodiv);
        this.container.appendChild(this.join_btn);
    }

    public set map(path: string) {
        let uri = `./maps/${path?.toLowerCase()}.png`;

        this.mappreview.style.backgroundImage = uri;
        this.mappreview.style.backgroundSize  = `100% 100%`;
    }
}

export interface BattleList extends Events<BattleListEvents> {};

mixin(BattleList, [new Events<BattleListEvents>()]);


// mapname
// winning condition
// language?
// unit cap
// description
// rank