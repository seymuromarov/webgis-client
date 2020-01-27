<template>
    <div>
        <h5 class="text-left-layer" v-if="dynamicLayerList.length > 0">
            Dynamic Layers
            <span>
                <i
                    v-if="!dynamicLayersShow"
                    @click="dynamicLayersShow = true"
                    class="fas fa-caret-left makeMePoint"
                ></i>
                <i
                    v-if="dynamicLayersShow"
                    @click="dynamicLayersShow = false"
                    class="fas fa-caret-down makeMePoint"
                ></i>
            </span>
        </h5>

        <LayerColorPicker @saveColor="$emit('saveColor')" />

        <transition name="slide-fade">
            <Draggable
                v-show="dynamicLayersShow"
                class="list-group"
                tag="ul"
                key="dynamicLayer"
                :value="dynamicLayerList"
                @input="$emit('dynamicLayerListOnChange', $event)"
                v-bind="dragOptionsDynamic"
                @start="isDragging = true"
                @end="$emit('onMoveCallbackDynamicLayerList', $event)"
            >
                <transition-group type="transition" name="flip-list">
                    <li
                        class="list-group-item list-group-item--custom"
                        v-for="element in dynamicLayerList"
                        :key="element.name"
                        style="text-align: left"
                    >
                        <div class="row">
                            <div class="col-12 layerDiv">
                                <input
                                    class="parentCheckbox"
                                    :id="element.name"
                                    :name="element.name"
                                    type="checkbox"
                                    :value="selectedLayers[element.id]"
                                    @input="
                                        $emit(
                                            'selectedLayersOnChange',
                                            $event,
                                            element.id
                                        )
                                    "
                                    @click="
                                        $emit(
                                            'selectService',
                                            element,
                                            element.order,
                                            true,
                                            $event,
                                            false
                                        )
                                    "
                                />
                                <i
                                    class="checkbox-icon far fa-check-circle"
                                ></i>
                                <label :for="element.showingLabel"></label>
                                <span class="serviceTitle">{{
                                    element.showingLabel
                                }}</span>

                                <span>
                                    <i
                                        v-if="
                                            element.collapseVisibility &&
                                                !element.layersVisibility
                                        "
                                        @click="
                                            $emit(
                                                'dynamicLayersReset',
                                                element,
                                                true
                                            )
                                        "
                                        class="fas fa-caret-left makeMePoint"
                                    ></i>
                                    <i
                                        v-if="element.layersVisibility"
                                        @click="
                                            element.layersVisibility = false
                                        "
                                        class="fas fa-caret-down makeMePoint"
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <div
                            style="background: whitesmoke;padding-top: 10px; "
                            v-show="element.layersVisibility"
                        >
                            <div
                                class="row layerDiv"
                                v-for="(layer, index) in element.layers"
                                :key="index"
                                :style="{
                                    paddingLeft: layer.margin * 30 + 'px',
                                }"
                            >
                                <div class="col-12" style="white-space: nowrap">
                                    <input
                                        class="parentCheckbox"
                                        v-show="layer.geometryType"
                                        :id="element.name + layer.id"
                                        :value="element.name + layer.id"
                                        :name="element.name + layer.id"
                                        @input="
                                            e =>
                                                $emit(
                                                    'dynamicSubLayerListOnChange',
                                                    e,
                                                    element.name,
                                                    layer.id
                                                )
                                        "
                                        type="checkbox"
                                        @click="
                                            $emit(
                                                'selectSubService',
                                                element,
                                                element.order,
                                                layer.id,
                                                $event
                                            )
                                        "
                                    />
                                    <i
                                        class="checkbox-icon far fa-check-circle"
                                    ></i>
                                    <label
                                        :for="element.name + layer.id"
                                    ></label>
                                    <span
                                        class="serviceTitle"
                                        :for="layer.name"
                                        >{{ layer.name }}</span
                                    >
                                    <div class>
                                        <i
                                            class="dataIcon fas fa-table"
                                            @click="
                                                $emit(
                                                    'getTableData',
                                                    element,
                                                    layer.id,
                                                    layer.name,
                                                    { where: '1=1' }
                                                )
                                            "
                                        ></i>
                                        <i
                                            style="margin-left: 10px;"
                                            class="dataIcon fab fa-codiepie"
                                            v-if="element.color === true"
                                            @click="
                                                $emit(
                                                    'openColorPicker',
                                                    element,
                                                    layer.id,
                                                    layer.name,
                                                    element.order
                                                )
                                            "
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </transition-group>
            </Draggable>
        </transition>

        <SimpleFilterModal ref="reportFilterModal" />
    </div>
</template>
