import "@/global.css"
import { Text, View, Image, FlatList } from "react-native";
import { formatCurrency } from "@/lib/utils"
import { styled } from 'nativewind'
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import images from "@/constants/images";
import { icons } from "@/constants/icon";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpcommingSubcriptionCard from "@/components/UpcomingSubcriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";

const SafeAreaView = styled(RNSafeAreaView)

export default function App() {

    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null)

    return (
        <SafeAreaView className="flex-1 p-5 bg-background">


            <View className="flex-1">
                
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <View className="home-header">
                                <View className="home-user">
                                    <Image source={images.avatar} className="home-avatar" />
                                    <Text className="home-user-name">{HOME_USER.name}</Text>
                                </View>
                                <View className="home-add-container">
                                    <Image source={icons.add} className="home-add-icon" />
                                </View>
                            </View>

                            <View className="home-balance-card">
                                <Text className="home-balance-label">Balance</Text>

                                <View className="home-balance-row">
                                    <Text className="home-balance-amount">
                                        {formatCurrency(HOME_BALANCE.amount)}
                                    </Text>
                                    <Text className="home-balance-date">
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format("DD/MM")}
                                    </Text>
                                </View>
                            </View>

                            <View className="mb-5">
                                <ListHeading title="Upcoming" />
                                <FlatList data={UPCOMING_SUBSCRIPTIONS} horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <UpcommingSubcriptionCard {...item} />
                                    )}

                                    keyExtractor={(item) => item.id}

                                    ListEmptyComponent={
                                        <Text className="home-empty-state">
                                            No upcoming renewals yet.
                                        </Text>
                                    }
                                />
                            </View>

                            <ListHeading title="All Subscriptions" />
                        </>
                    )}
                    data={HOME_SUBSCRIPTIONS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <SubscriptionCard
                            {...item}
                            expanded={expandedSubscriptionId === item.id}
                            onPress={() => (
                                setExpandedSubscriptionId((currentId) => (currentId === item.id ? null : item.id))
                            )}
                        />
                    )}
                    extraData={expandedSubscriptionId}
                    ItemSeparatorComponent={() => <View className="h-4"></View>}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text className="home-empty-state">
                            No subscriptions yet.
                        </Text>
                    }

                    contentContainerClassName="pb-30"

                />

            </View>

        </SafeAreaView>
    );
}