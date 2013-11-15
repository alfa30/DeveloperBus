package mx.developerbus.foodbus.model;

/**
 * Copyright [2013] [Diego Ernesto Franco Chanona, Irving Lopez Perez, Miriam Alejandra Lugo Muci�o, Raymundo Juarez Cortes]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

import mx.developerbus.foodbus.enm.MenuOptionType;

public class MenuOption {

	private MenuOptionType type;
	private int resourceId;
	private String title;
	private boolean selected;
	

	public int getResourceId() {
		return resourceId;
	}

	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}

	public MenuOptionType getType() {
		return type;
	}

	public void setType(MenuOptionType type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;

	}

	public boolean isSelected(boolean b) {
		return selected;

	}
	
}
