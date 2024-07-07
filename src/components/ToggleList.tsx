import React, { useState } from "react";
import { Checkbox, FormControlLabel, List, ListItem, Collapse, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type MenuItem = {
    department: string;
    sub_departments?: Array<string>;
};

type MenuConfig = Array<MenuItem>;

function Item({ item, handleSelectItem, selectedItems }: { item: MenuItem, handleSelectItem: (title: string, isSubItem: boolean, isSelected: boolean) => void, selectedItems: Set<string> }): React.ReactElement {
    const [showItem, setShowItem] = useState(false);

    const handleToggle = (): void => {
        setShowItem(prev => !prev);
    };

    const isParentSelected = selectedItems.has(item.department);

    const handleParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isSelected = event.target.checked;
        handleSelectItem(item.department, false, isSelected);
        if (item.sub_departments) {
            item.sub_departments.forEach(subItem => handleSelectItem(subItem, true, isSelected));
        }
    };

    const handleSubItemCheckboxChange = (subItem: string, isSelected: boolean) => {
        handleSelectItem(subItem, true, isSelected);
        if (item.sub_departments) {
            const allSubItemsSelected = item.sub_departments.every(sd => 
                sd === subItem ? isSelected : selectedItems.has(sd)
            );
            handleSelectItem(item.department, false, allSubItemsSelected);
        }
    };

    return (
        <>
            <ListItem>
                <FormControlLabel
                    control={<Checkbox checked={isParentSelected} onChange={handleParentCheckboxChange} />}
                    label={item.department}
                />
                {item.sub_departments && (
                    <IconButton onClick={handleToggle}>
                        {showItem ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                )}
            </ListItem>
            <Collapse in={showItem} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.sub_departments && item.sub_departments.map((subItem, i) => (
                        <ListItem key={i} sx={{ pl: 4 }}>
                            <FormControlLabel
                                control={<Checkbox checked={selectedItems.has(subItem)} onChange={(e) => handleSubItemCheckboxChange(subItem, e.target.checked)} />}
                                label={subItem}
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </>
    );
}

function ToggleList(): React.ReactElement {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    const handleSelectItem = (title: string, isSubItem: boolean, isSelected: boolean) => {
        setSelectedItems(prevSelectedItems => {
            const newSelectedItems = new Set(prevSelectedItems);
            if (isSelected) {
                newSelectedItems.add(title);
            } else {
                newSelectedItems.delete(title);
            }
            return newSelectedItems;
        });
    };

    const menuConfig: MenuConfig = [
        {
            department: "customer_service",
            sub_departments: [
                "support",
                "customer_success"
            ]
        },
        {
            department: "design",
            sub_departments: [
                "graphic_design",
                "product_design",
                "web_design"
            ]
        }
    ];

    return (
        <>
            <h2>Departments</h2>
            <List>
                {menuConfig.map((item, i) => (
                    <Item key={i} item={item} handleSelectItem={handleSelectItem} selectedItems={selectedItems} />
                ))}
            </List>
        </>
    );
}

export default ToggleList;
