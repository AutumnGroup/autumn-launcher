//
//  Leftbar in which you can select tabs or play
//
import { WidgetBase } from "../../widgets/base";

import { TabContainer } from "./container";


export class Menu extends WidgetBase
{
    private top:    TabContainer;
    private center: TabContainer;
    private bottom: TabContainer;

    constructor(parent: HTMLDivElement)
    {
        super(parent);

        // ORDER IS IMPORTANT!! FLEX PROPERTY...
        this.top    = new TabContainer(this.container, "top");
        this.center = new TabContainer(this.container, "center");
        this.bottom = new TabContainer(this.container, "bottom");

        this.setup_dom();
    }

    public setup_dom()
    {
        this.container.id = "menu";

        this.top.create_tab("profile");

        this.center.create_tab("battles");
        this.center.create_tab("download");

        this.bottom.create_tab("settings");
    }
}